from django.urls import path
from .views import *

urlpatterns = [
    # Aluno
    path('', HomepageView.as_view(), name="homepage"),
    path('gerenciar-equipes/', ManageTeamsView.as_view(), name="manage_teams"),
    path('gerenciar-equipes/adicionar-membro/<int:pk>/', AddNewMemberToTeamView.as_view(), name="add_member_to_team"),
    path('gerenciar-equipes/<int:team_pk>/solicitar-remocao/<int:user_pk>/', RequestRemoveMemberFromTeamView.as_view(), name="request_remove_member"),
    path('gerenciar-equipes/remover-equipe/<int:team_pk>/', RequestRemoveTeamView.as_view(), name="request_remove_team"),
    path('registrar-equipe/', RegisterTeamView.as_view(), name="register_team_student"),
    path('competicao/<str:name>/', LeagueView.as_view(), name="league"),
    path('competicao/futsal-masculino/', view_group_stage_page, name="group"), #futsal-masculino vai ser substituido pelo id/nome da competição
    path('competicao/volei-indoor/', view_qualifiers_stage_page, name="qualifiers"), #volei-indoor vai ser substituido pelo id/nome da competição
    # Organizador
    path('organizador/modalidades/', ManageModalityView.as_view(), name="modality_list"),
    path('organizador/modalidades/<int:pk>/delete/', DeleteModalityView.as_view(), name="delete_modality"),
    path('organizador/modalidades/<int:pk>/edit/', EditModalityView.as_view(), name="edit_modality"),
    path('organizador/equipes/', TeamsView.as_view(), name="teams_list"),
    path('organizador/equipes/registrar-equipe/competicao/<int:competition_pk>/', RegisterTeamView.as_view(), name="register_team"),
    path('organizador/equipes/editar-equipe/<int:pk>', EditTeamView.as_view(), name="edit_team"),
    path('organizador/equipes/editar-equipe/<int:pk>/remover-membro/<int:member_id>', RemoveMemberView.as_view(), name="remove_team"),
    path('organizador/competicoes/', ManageCompetitionsView.as_view(), name="competitions_list"),
    path('organizador/competicoes/adicionar/<int:pk>', AddCompetitionsView.as_view(), name="create_competition"),
    path('organizador/competicoes/<int:pk>/delete/', DeleteCompetitionsView.as_view(), name="delete_competition"),
    path('organizador/competicoes/<int:pk>/start/', auto_generate_rounds, name="start_competition"),
    path('organizador/competicoes/<str:name>/', DetailCompetitionView.as_view(), name="detail_competition"),
    path('organizador/competicoes/<int:pk>/edit-game/', EditScoreBoardView.as_view(), name="edit_game"),
    path('organizador/competicoes/<int:pk>/edit-round/', EditGameDateView.as_view(), name="edit_game_date"),
    path('organizador/competicoes/<int:pk>/end/', EndCompetitionView.as_view(), name="end_competition"),
    path('organizador/solicitacoes/', RequestsView.as_view(), name="requests_list"),
    path('request/<int:request_pk>/', get_request_data, name='get_request_data'),
]