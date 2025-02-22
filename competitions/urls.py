from django.urls import path
from .views import *

urlpatterns = [
    # Aluno
    path('', view_homepage, name="homepage"),
    path('gerenciar-equipes/', ManageTeamsView.as_view(), name="manage_teams"),
    path('gerenciar-equipes/adicionar-membro/<int:pk>/', AddNewMemberToTeamView.as_view(), name="add_member_to_team"),
    path('gerenciar-equipes/<int:team_pk>/solicitar-remocao/<int:user_pk>/', RequestRemoveMemberFromTeamView.as_view(), name="request_remove_member"),
    path('gerenciar-equipes/remover-equipe/<int:team_pk>/', RequestRemoveTeamView.as_view(), name="request_remove_team"),
    path('registrar-equipe/', RegisterTeamView.as_view(), name="register_team_student"),
    path('competicao/basquete/', view_league_page, name="league"), #basquete vai ser substituido pelo id/nome da competição
    path('competicao/futsal-masculino/', view_group_stage_page, name="group"), #futsal-masculino vai ser substituido pelo id/nome da competição
    path('competicao/volei-indoor/', view_qualifiers_stage_page, name="qualifiers"), #volei-indoor vai ser substituido pelo id/nome da competição
    # Organizador
    path('organizador/modalidades/', view_modality_page, name="modality_list"),
    path('organizador/equipes/', TeamsView.as_view(), name="teams_list"),
    path('organizador/equipes/registrar-equipe/', view_register_team, name="register_team"),
    path('organizador/equipes/editar-equipe/<int:pk>', EditTeamView.as_view(), name="edit_team"),
    path('organizador/competicoes/', view_competitions_page, name="competitions_list"),
    path('organizador/competicoes/detalhes/', view_detail_comp_page, name="detail"), # deatail vai ser subituido pelo id/nome da competição
    path('organizador/solicitacoes/', RequestsView.as_view(), name="requests_list"),
    path('request/<int:request_pk>/', get_request_data, name='get_request_data'),
]