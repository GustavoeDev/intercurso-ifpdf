from django.views.generic import ListView, DeleteView
from .models import *
from .forms import *
from django.forms import formset_factory
from django.views.generic import View
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.urls import reverse_lazy
from django.db import transaction
from django.core.exceptions import ValidationError
from django.utils.timezone import localtime
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from users.mixins import GroupRequiredMixin
from django.shortcuts import render, redirect

# Aluno

def view_homepage(request):
    return render(request, 'student/home.html')

class ManageTeamsView(LoginRequiredMixin, GroupRequiredMixin, ListView):
    model = Team
    template_name = 'student/manage_teams.html'
    context_object_name = 'teams'
    group_required = 'Student'

    def get_queryset(self):
        return Team.objects.filter(members=self.request.user, status='approved').order_by('-register_date')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        add_user_form = TeamMemberForm()
        request_remove_member_form = RemoveMemberRequestForm()
        request_remove_team_form = RemoveTeamRequestForm()

        context['add_user_form'] = add_user_form
        context['request_remove_member_form'] = request_remove_member_form
        context['request_remove_team_form'] = request_remove_team_form

        return context

    def post(self, request, *args, **kwargs):
        add_user_form = TeamMemberForm(request.POST)
        request_remove_member_form = RemoveMemberRequestForm(request.POST)
        request_remove_team_form = RemoveTeamRequestForm(request.POST)
        
        if add_user_form.is_valid():
            add_user_form.save()
            return redirect('manage_teams')

        if request_remove_member_form.is_valid():
            request_remove_member_form.save()
            return redirect('manage_teams')
        
        if request_remove_team_form.is_valid():
            request_remove_team_form.save()
            return redirect('manage_teams')

        return self.get(request, *args, **kwargs)
    
class AddNewMemberToTeamView(View):
    def post(self, request, pk):
        team = get_object_or_404(Team, pk=pk)
        competition = team.competition
        max_members_per_team = competition.max_members_per_team
        form = TeamMemberForm(request.POST)
        
        if form.is_valid():
            username = form.cleaned_data['username']
            full_name = form.cleaned_data['full_name']
            
            # Verifica se o usuário existe
            try:
                if team.members.count() >= max_members_per_team:
                    return JsonResponse({
                        'status': 'error',
                        'message': 'A equipe já está completa.'
                    })

                user = CustomUser.objects.get(username=username)
                
                # Verifica se o nome informado corresponde à matrícula
                user_full_name = f"{user.first_name} {user.last_name}".strip()
                if user_full_name.lower() != full_name.lower():
                    return JsonResponse({
                        'status': 'error',
                        'message': 'O nome informado não corresponde à matrícula.'
                    })
                
                # Verifica se o usuário já está na equipe
                if user in team.members.all():
                    return JsonResponse({
                        'status': 'error',
                        'message': 'Este usuário já é membro desta equipe.'
                    })
                
                # Verifica se este usuário já está em outro time da mesma competição
                user_teams = Team.objects.filter(
                    competition=team.competition,
                    members=user
                )
                if user_teams.exists():
                    return JsonResponse({
                        'status': 'error',
                        'message': 'Este usuário já está em outra equipe nesta competição.'
                    })
                
                # Adiciona o usuário à equipe
                team.members.add(user)
                team.save()
                messages.success(request, 'Membro adicionado com sucesso!')
                return JsonResponse({
                    'status': 'success',
                    'message': 'Membro adicionado com sucesso!'
                })
                
            except CustomUser.DoesNotExist:
                return JsonResponse({
                    'status': 'error',
                    'message': 'Usuário não encontrado. Verifique as credenciais e tente novamente.'
                })
                
        return JsonResponse({
            'status': 'error',
            'message': 'Dados inválidos. Verifique os campos e tente novamente.'
        })

class RequestRemoveMemberFromTeamView(View):
    def post(self, request, team_pk, user_pk):
        team = get_object_or_404(Team, pk=team_pk)
        user = get_object_or_404(CustomUser, pk=user_pk)
        competition = team.competition
        min_members_per_team = competition.min_members_per_team
        form = RemoveMemberRequestForm(request.POST)

        if user not in team.members.all():
            return JsonResponse({
                'status': 'error',
                'message': 'Este usuário não é membro desta equipe.'
            })

        if form.is_valid():
            try:
                if team.members.count() == min_members_per_team:
                    return JsonResponse({
                        'status': 'error',
                        'message': f'A equipe deve ter pelo menos {min_members_per_team} membros.'
                    })

                existing_request = Request.objects.filter(
                    request_type='remove_team_member',
                    team=team,
                    user=user,
                    status='pendent'
                ).exists()

                if existing_request:
                    return JsonResponse({
                        'status': 'error',
                        'message': 'Esta solicitação já foi enviada.'
                    })

                new_request = Request.objects.create(
                    request_type='remove_team_member',
                    team=team,
                    user=user,
                    reason=form.cleaned_data['reason'],
                    status='pendent'
                )

                created_at_local = localtime(new_request.created_at)
                
                messages.success(request, 'Solicitação enviada com sucesso!')
                return JsonResponse({
                    'status': 'success',
                    'message': 'Solicitação enviada com sucesso!',
                    'created_at': created_at_local.strftime("%d/%m/%Y")
                })
            except Exception as e:
                return JsonResponse({
                    'status': 'error',
                    'message': 'Erro ao criar solicitação de remoção.'
                })
        else:
            return JsonResponse({
                'status': 'error',
                'message': 'Por favor, forneça um motivo válido para a remoção.'
            })

class RequestRemoveTeamView(View):
    def post(self, request, team_pk):
        team = get_object_or_404(Team, pk=team_pk)
        form = RemoveTeamRequestForm(request.POST)

        if form.is_valid():
            try:
                existing_request = Request.objects.filter(
                    request_type='delete_team',
                    team=team,
                    status='pendent'
                ).exists()
                if existing_request:
                    return JsonResponse({
                        'status': 'error',
                        'message': 'Esta solicitação já foi enviada.'
                    })
                
                new_request = Request.objects.create(
                    request_type='delete_team',
                    team=team,
                    reason=form.cleaned_data['reason'],
                    status='pendent'
                )
                created_at_local = localtime(new_request.created_at)
                messages.success(request, 'Solicitação enviada com sucesso!')
                return JsonResponse({
                    'status': 'success',
                    'message': 'Solicitação enviada com sucesso!',
                    'created_at': created_at_local.strftime("%d/%m/%Y")
                })
            except Exception as e:
                return JsonResponse({
                    'status': 'error',
                    'message': 'Erro ao criar solicitação de remoção.'
                })
        else:
            return JsonResponse({
                'status': 'error',
                'message': 'Por favor, forneça um motivo válido para a remoção.'
            })

class RegisterTeamView(LoginRequiredMixin, View):
    template_name = 'student/register_team.html'
    success_url = reverse_lazy('manage_teams')

    def get(self, request, *args, **kwargs):
        team_form = TeamForm()
        MemberFormSet = formset_factory(TeamMemberForm, extra=1, max_num=9, validate_max=True)
        member_formset = MemberFormSet(prefix='members')

        competitions = Competition.objects.all()
        competition_data = {
            comp.id: {'min': comp.min_members_per_team, 'max': comp.max_members_per_team}
            for comp in competitions
        }

        return render(request, self.template_name, {
            'team_form': team_form,
            'member_formset': member_formset,
            'competition_data': competition_data,
        })

    def post(self, request, *args, **kwargs):
        team_form = TeamForm(request.POST)
        MemberFormSet = formset_factory(TeamMemberForm, extra=1, max_num=9, validate_max=True)
        member_formset = MemberFormSet(request.POST, prefix='members')

        competitions = Competition.objects.all()
        competition_data = {
            comp.id: {'min': comp.min_members_per_team, 'max': comp.max_members_per_team}
            for comp in competitions
        }

        if team_form.is_valid() and member_formset.is_valid():
            valid_members = [
                form for form in member_formset
                if form.has_changed() and form.cleaned_data
            ]

            if not valid_members:
                return JsonResponse({
                    'success': False,
                    'errors': {'__all__': ["Adicione pelo menos um membro à equipe."]}
                })

            competition_id = team_form.cleaned_data.get('competition').id
            min_members = competition_data[competition_id]['min']
            max_members = competition_data[competition_id]['max']
            num_members = len(valid_members)

            if num_members < min_members:
                return JsonResponse({
                    'success': False,
                    'errors': {'__all__': [f"A competição requer pelo menos {min_members} membros."]}
                })
            elif num_members > max_members:
                return JsonResponse({
                    'success': False,
                    'errors': {'__all__': [f"A competição permite no máximo {max_members} membros."]}
                })

            team_name = team_form.cleaned_data.get('name')
            competition = team_form.cleaned_data.get('competition')
            
            # Verificação de nome duplicado
            if Team.objects.filter(name__iexact=team_name, competition=competition).exists():
                return JsonResponse({
                    'success': False,
                    'errors': {'name': ["Já existe uma equipe com este nome na competição selecionada."]}
                })

            # Verificação de abreviação duplicada
            team_abbreviation = team_form.cleaned_data.get('abbreviation')
            if Team.objects.filter(abbreviation__iexact=team_abbreviation, competition=competition).exists():
                return JsonResponse({
                    'success': False,
                    'errors': {'abbreviation': ["Já existe uma equipe com esta abreviação na competição selecionada."]}
                })

            try:
                with transaction.atomic():
                    member_errors = []
                    for i, member_form in enumerate(valid_members):
                        username = member_form.cleaned_data.get('username')
                        full_name = member_form.cleaned_data.get('full_name', '').strip()
                        selected_course = member_form.cleaned_data.get('course')
                        
                        try:
                            user = CustomUser.objects.get(username=username)
                            
                            # Verificar se o nome completo corresponde
                            user_full_name = f"{user.first_name} {user.last_name}".strip()
                            if user_full_name and full_name and user_full_name.lower() != full_name.lower():
                                return JsonResponse({
                                    'success': False,
                                    'errors': {f'members-{i}-full_name': [f"O nome '{full_name}' não corresponde ao nome do usuário cadastrado ({user_full_name})."]}
                                })
                            
                            # Verificar se o curso corresponde
                            if selected_course and user.course and user.course != selected_course:
                                return JsonResponse({
                                    'success': False,
                                    'errors': {f'members-{i}-course': [f"O curso selecionado não corresponde ao curso do usuário {username} no sistema."]}
                                })
                            
                            # Verificar se o usuário já está em outra equipe na mesma competição
                            existing_team = Team.objects.filter(competition=competition, members=user).first()
                            if existing_team:
                                return JsonResponse({
                                    'success': False,
                                    'errors': {f'members-{i}-username': [f"O usuário {username} já está inscrito na equipe '{existing_team.name}' nesta competição."]}
                                })
                                
                        except CustomUser.DoesNotExist:
                            return JsonResponse({
                                'success': False,
                                'errors': {f'members-{i}-username': [f"Usuário com matrícula {username} não encontrado."]}
                            })

                    team = team_form.save()

                    existing_request = Request.objects.filter(
                        request_type='approve_team',
                        team=team,
                        status='pendent'
                    ).exists()

                    if existing_request:
                        return JsonResponse({
                            'status': 'error',
                            'message': 'Esta solicitação já foi enviada.'
                        })

                    # Adicionar membros à equipe
                    for i, member_form in enumerate(valid_members):
                        username = member_form.cleaned_data.get('username')
                        user = CustomUser.objects.get(username=username)
                        team.members.add(user)

                    new_request = Request.objects.create(
                        request_type='approve_team',
                        team=team,
                        status='pendent'
                    )

                    created_at_local = localtime(new_request.created_at)
                    messages.success(request, 'Solicitação enviada com sucesso!')

                    return JsonResponse({
                        'status': 'success',
                        'message': 'Solicitação enviada com sucesso!',
                        'created_at': created_at_local.strftime("%d/%m/%Y")
                    })

            except ValidationError as e:
                return JsonResponse({
                    'success': False,
                    'errors': {'__all__': e.messages if hasattr(e, 'messages') else [str(e)]}
                })
            except Exception as e:
                print(f"Erro ao salvar equipe: {e}")  # <-- Adiciona log no console
                return JsonResponse({
                    'success': False,
                    'errors': {'__all__': [f"Erro ao salvar: {str(e)}"]}
                })

        errors = {}
        
        if team_form.errors:
            for field, error_list in team_form.errors.items():
                if field == '__all__':
                    errors['__all__'] = error_list
                else:
                    errors[field] = error_list

        if member_formset.errors:
            for i, form_errors in enumerate(member_formset.errors):
                if form_errors:
                    for field, error_list in form_errors.items():
                        errors[f'members-{i}-{field}'] = error_list

        if member_formset.non_form_errors():
            if '__all__' not in errors:
                errors['__all__'] = []
            errors['__all__'].extend(member_formset.non_form_errors())

        return JsonResponse({
            'success': False,
            'errors': errors
        })
    
def view_league_page(request):
    return render(request, 'student/league_page.html')

def view_group_stage_page(request):
    return render(request, 'student/group_stage_page.html')

def view_qualifiers_stage_page(request):
    return render(request, 'student/qualifiers_stage_page.html')

# Organizador

def view_modality_page(request):
    return render(request, 'organizer/modality_page.html')

class TeamsView(LoginRequiredMixin, GroupRequiredMixin, ListView):
    model = Team
    template_name = 'organizer/teams_page.html'
    context_object_name = 'teams'
    group_required = 'Organizer'

    def get_queryset(self):
        return Team.objects.filter(status='approved').order_by('-register_date')
        
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)  
        context['competitions'] = Competition.objects.all()
        
        for competition in context['competitions']:
            competition.teams = Team.objects.filter(competition=competition, status='approved')
        
        return context

def view_register_team(request):
    return render(request, 'organizer/register_team_page.html')

class EditTeamView(LoginRequiredMixin, GroupRequiredMixin, View):
    template_name = 'organizer/edit_team_page.html'
    success_url = reverse_lazy('teams_list')
    group_required = 'Organizer'

    def get(self, request, *args, **kwargs):
        team = get_object_or_404(Team, pk=kwargs['pk'])
        form = TeamMemberForm()
        context = {
            'team': team,
            'form': form,
        }
        return render(request, self.template_name, context)

    def post(self, request, *args, **kwargs):
        team = get_object_or_404(Team, pk=kwargs['pk'])

        action = request.POST.get('action')

        if action == 'delete_team':
            team.delete()
            return JsonResponse({
                'success': True,
                'message': 'Equipe excluída com sucesso.'
            })
        
        form = TeamMemberForm(request.POST)
        if form.is_valid():
            try:
                username = form.cleaned_data['username']
                user = CustomUser.objects.get(username=username)
                competition = team.competition
                max_members_per_team = competition.max_members_per_team

                if team.members.count() == max_members_per_team:
                    return JsonResponse({
                        'success': False,
                        'message': f'A equipe já atingiu o número máximo de membros ({max_members_per_team}).'
                    })

                if team.members.filter(id=user.id).exists():
                    return JsonResponse({
                        'success': False,
                        'message': f"O usuário {user} já está na equipe."
                    })
                
                # Verifica se o usuário já está na equipe
                if user in team.members.all():
                    return JsonResponse({
                        'status': 'error',
                        'message': 'Este usuário já é membro desta equipe.'
                    })
                
                # Verifica se este usuário já está em outro time da mesma competição
                user_teams = Team.objects.filter(
                    competition=team.competition,
                    members=user
                )
                if user_teams.exists():
                    return JsonResponse({
                        'status': 'error',
                        'message': 'Este usuário já está em outra equipe nesta competição.'
                    })

                team.members.add(user)
                return JsonResponse({
                    'success': True,
                    'message': f"Usuário {user} adicionado à equipe com sucesso."
                })

            except CustomUser.DoesNotExist:
                return JsonResponse({
                    'success': False,
                    'message': "Usuário não encontrado. Verifique as credenciais."
                })

        errors = form.errors.as_json()
        return JsonResponse({
            'success': False,
            'message': "Dados inválidos. Verifique os campos.",
            'errors': errors
        })

class RemoveMemberView(LoginRequiredMixin, GroupRequiredMixin, View):
    success_url = reverse_lazy('teams_list')
    group_required = 'Organizer'

    def post(self, request, *args, **kwargs):
        team_id = kwargs.get('pk')
        member_id = request.POST.get('member_id')
        
        try:
            team = Team.objects.get(pk=team_id)
        except Team.DoesNotExist:
            return JsonResponse({
                'success': False,
                'message': 'Equipe não encontrada.'
            })
        
        competition = team.competition
        min_members_per_team = competition.min_members_per_team
        
        if team.members.count() == min_members_per_team:
            return JsonResponse({
                'success': False,
                'message': f'A equipe atingiu o número mínimo de membros ({min_members_per_team}).'
            })
        
        try:
            member = CustomUser.objects.get(pk=member_id)
        except CustomUser.DoesNotExist:
            return JsonResponse({
                'success': False,
                'message': 'Membro não encontrado.'
            })
        
        team.members.remove(member)

        return JsonResponse({
            'success': True,
            'message': 'Membro removido com sucesso.'
        })
    
def view_competitions_page(request):
    return render(request, 'organizer/competitions_page.html')

def view_detail_comp_page(request):
    return render(request, 'organizer/detail_competition_page.html')

class RequestsView(LoginRequiredMixin, GroupRequiredMixin, ListView):
    model = Request
    template_name = 'organizer/requests_page.html'
    context_object_name = 'requests'
    group_required = 'Organizer'

    def get_queryset(self):
        return Request.objects.filter(status='pendent').order_by('-created_at')
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        context['reject_request_form'] = RejectRequestForm()
        return context
    
    def post(self, request, *args, **kwargs):
        action = request.POST.get('action')
        request_id = request.POST.get('request_id')
        reason_rejected = request.POST.get('reason_rejected')

        if not request_id:
            return JsonResponse({'success': False, 'message': 'ID da solicitação não fornecido.'}, status=400)

        try:
            request_instance = Request.objects.get(id=request_id)
        except Request.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Requisição não encontrada.'}, status=404)

        try:
            if action == 'approve':
                request_instance.status = 'approved'
                request_instance.save()
                return JsonResponse({'success': True, 'message': 'Requisição aprovada com sucesso.'})

            elif action == 'reject':
                if not reason_rejected:
                    return JsonResponse({'success': False, 'message': 'Motivo da rejeição é obrigatório.'}, status=400)
                request_instance.status = 'rejected'
                request_instance.reason_rejected = reason_rejected
                request_instance.save()
                return JsonResponse({'success': True, 'message': 'Requisição rejeitada com sucesso.'})

            else:
                return JsonResponse({'success': False, 'message': 'Ação inválida.'}, status=400)

        except ValidationError as e:
            return JsonResponse({'success': False, 'message': str(e)}, status=400)


def get_request_data(request, request_pk):
    request_obj = get_object_or_404(Request, id=request_pk)
    
    data = {
        'id': request_obj.id,
        'team_name': request_obj.team.name,
        'competition': request_obj.team.competition.name,
        'request_type': request_obj.request_type,
        'created_at': request_obj.created_at.strftime('%d/%m/%Y'),
        'user_remove': f"{request_obj.user.first_name} {request_obj.user.last_name}" if request_obj.user else 'Usuário não especificado',
        'reason': request_obj.reason,
        'members': [
            {
                'name': f"{member.first_name} {member.last_name}",
                'registration': member.username,
                'course': member.course.name if member.course else ''
            }
            for member in request_obj.team.members.all()
        ],
    }
    
    return JsonResponse(data)
