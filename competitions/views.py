from django.views.generic import ListView
from .models import *
from .forms import AddUserToTeamForm, RemoveMemberRequestForm
from django.views.generic import View
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.urls import reverse_lazy
from django.utils.timezone import localtime
from django.contrib import messages
from django.shortcuts import render, redirect

# Aluno

def view_homepage(request):
    return render(request, 'student/home.html')

class ManageTeamsView(ListView):
    model = Team
    template_name = 'student/manage_teams.html'
    context_object_name = 'teams'

    def get_queryset(self):
        return Team.objects.filter(members=self.request.user, status='approved').order_by('-register_date')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        add_user_form = AddUserToTeamForm()
        request_remove_member_form = RemoveMemberRequestForm()

        context['add_user_form'] = add_user_form
        context['request_remove_member_form'] = request_remove_member_form

        return context

    def post(self, request, *args, **kwargs):
        add_user_form = AddUserToTeamForm(request.POST)
        request_remove_member_form = RemoveMemberRequestForm(request.POST)
        
        if add_user_form.is_valid():
            add_user_form.save()
            return redirect('manage_teams')

        if request_remove_member_form.is_valid():
            request_remove_member_form.save()
            return redirect('manage_teams')

        return self.get(request, *args, **kwargs)
    
class AddNewMemberToTeamView(View):
    def post(self, request, pk):
        team = get_object_or_404(Team, pk=pk)
        form = AddUserToTeamForm(request.POST)
        
        if form.is_valid():
            username = form.cleaned_data['username']
            full_name = form.cleaned_data['full_name']
            
            # Verifica se o usuário existe
            try:
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
        form = RemoveMemberRequestForm(request.POST)

        if user not in team.members.all():
            return JsonResponse({
                'status': 'error',
                'message': 'Este usuário não é membro desta equipe.'
            })

        if form.is_valid():
            try:
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

def view_add_team(request):
    return render(request, 'student/register_team.html')

def view_league_page(request):
    return render(request, 'student/league_page.html')

def view_group_stage_page(request):
    return render(request, 'student/group_stage_page.html')

def view_qualifiers_stage_page(request):
    return render(request, 'student/qualifiers_stage_page.html')

# Organizador

def view_modality_page(request):
    return render(request, 'organizer/modality_page.html')

def view_teams_page(request):
    return render(request, 'organizer/teams_page.html')

def view_register_team(request):
    return render(request, 'organizer/register_team_page.html')

def view_edit_team(request):
    return render(request, 'organizer/edit_team_page.html')

def view_competitions_page(request):
    return render(request, 'organizer/competitions_page.html')

def view_detail_comp_page(request):
    return render(request, 'organizer/detail_competition_page.html')

def view_requests(request):
    return render(request, 'organizer/requests_page.html')
