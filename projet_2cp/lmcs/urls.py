from django.urls import path , include 
from rest_framework.routers import DefaultRouter 
from . import views 

#router = DefaultRouter()
#router.register(r'chercheurs', ProjetsListCreateAPIView)

urlpatterns =[
   
    path('ChercheursList/', views.ChercheurListAPIview.as_view(), name='Chercheur_list'),  # Chercheur list API endpoint
    path('ChercheursList/<int:pk>/', views.ChercheurDetailAPIview.as_view(), name='Chercheur_detail'),
    path('ProjetsList/', views.ProjetListAPIview.as_view(), name='Projet_list'),  # Projet list API endpoint
    path('ProjetsList/<int:pk>/', views.ProjetDetailAPIview.as_view(), name='Projet_detail'),  # Projet detail API endpoint
    path('EncadrementsList/', views.EncadrementListAPIview.as_view(), name='Encadrement_list'),  # Encadrement list API endpoint
    path('EncadrementsList/<int:pk>/', views.EncadrementDetailAPIview.as_view(), name='Encadrement_detail'),  # Encadrement detail API endpoint
    path('Conf_journalsList/', views.ConfJournalListAPIview.as_view(), name='Conf_journal_list'),  # Conf_journal list API endpoint
    path('Conf_journalsList/<int:pk>/', views.ConfJournalDetailAPIview.as_view(), name='Conf_journal_detail'),  # Conf_journal detail API endpoint
    
    path('ChercheurCreat/' , views.ChercheurCreatAPIview.as_view() , name ='ChercheurCreat'),
    path('ConfJournalCreat/', views.ConfJournalCreatAPIview.as_view(), name='ConfJournalCreat'),
    path('ProjetCreat/',views.ProjetCreateAPIView.as_view(),name='ProjetCreat'),
    path('EncadrementCreat/',views.EncadrementCreatAPIview.as_view(),name='EncadrementCreat'),
    path('publicationsCreate/', views.PublicationCreateAPIView.as_view(), name='publication_create'),

     path('publicationsCreateAdmine/', views.PublicationCreateADMINAPIView.as_view(), name='publication_create'),

    path('publicationsByChercheur/', views.PublicationByChercheurAPIView.as_view() , name='publication_by_chercheur'),
    path('publications/<int:pk>/modify/', views.PublicationModifyAPIView.as_view(), name='publication_modify'),
    path('publications/<int:pk>/delete/', views.PublicationDeleteAPIView.as_view(), name='publication_delete'),

    path('modifierconf_journ/<int:pk>',views.ConfjournModify.as_view(),name='Conf_Journ_Modify'), 
    path('projetByChercheur/', views.ProjetByChercheurAPIView.as_view(), name='projet_by_chercheur'),
    path('projet/<int:pk>/modify/', views.ProjetModifyAPIView.as_view(), name='projet_modify'),
    path('projet/<int:pk>/delete/', views.ProjetDeleteAPIView.as_view(), name='projet_delete'),

   
    path('encadrementByChercheur/', views.EncadrementByChercheurAPIView.as_view(), name='encadrement_by_chercheur'),
    path('encadrement/<int:pk>/modify/', views.EncadrementModifyAPIView.as_view(), name='encadrement_modify'),
    path('encadrement/<int:pk>/delete/', views.EncadrementDeleteAPIView.as_view(), name='encadrement_delete'),


    path('encadrementListAdmine/', views.EncadrementListADMINAPIView.as_view(), name='encadrement_list_admin'),



    path('pub_avant_modify/<int:pk>/', views.PubDetailModifAPIview.as_view(), name='detail_pub'),

    path('statistics/', views.get_statistics, name='statistics'),

    path('statisticsACC/', views.publications_stats, name='statistics'),

     path('chercheur/info/', views.ChercheurInfoAPIView.as_view(), name='chercheur-info'),

    path('publicationsListAdmine/', views.PublicationListADMINAPIView.as_view() , name='publication_by_chercheur'),
    path('projetsListAdmine/', views.ProjetListADMINAPIView.as_view() , name='publication_by_chercheur'),

    #-------------------------------------------  Meriem part  -----------------------------------------------------------


    path('chercheur-search/', views.ChercheurSearchAPIView.as_view(), name='chercheur-search'),
    path('chercheur-generalesearch/', views.ChercheurSearchGAPIView.as_view(), name='chercheur-gsearch'),
    path('publications/search/', views.PublicationSearchAPIView.as_view(), name='publication_search'),
    path('publications/gsearch/', views.PublicationSearchGAPIView.as_view(), name='publication_gsearch'),
    path('encadrements/search/', views.EncadrementSearchAPIView.as_view(), name='encadrement_search'),
    path('encadrements/genesearch/', views.EncadrementSearchGAPIView.as_view(), name='encadrement_gsearch'),
    path('projets/search/', views.ProjetSearchAPIView.as_view(), name='projet_search'),
    path('projets/gensearch/', views.ProjetSearchGAPIView.as_view(), name='projet_gsearch'),
    path('publication/<int:pk>/', views.PublicationDetailView.as_view(), name='publication_detail'),
    path('chercheur-plus-cite/', views.ChercheurPlusCite.as_view(), name='chercheur_plus_cite'),
    path('publication-plus-cite/', views.PublicationPlusCite.as_view(), name='publication_plus_cite'),
    path('chercheurs-plus-cite/', views.ChercheursPlusCite.as_view(), name='chercheurs_plus_cite'),
    path('chercheur/<int:id_chercheur>/', views.ChercheurprofileAPIView.as_view(), name='chercheur-detail'),
    path('publicationprofile/<int:id>/', views.PublicationprofileAPIView.as_view(), name='publication-detail'),
    path('publicationprofile2/<int:id>/', views.Publicationprofil2eAPIView.as_view(), name='publication-detail'),

     path('chercheurs/', views.ChercheurListAPIView.as_view(), name='chercheurs_list'),
     path('publicationslist/', views.PublicationssListAPIView.as_view(), name='publication_list'),
     path('encadrements/<int:id_encadrement>/', views.EncadrementDetailsAPIView.as_view(), name='encadrement-details'),
     path('encadrements/', views.EncadrementssListAPIView.as_view(), name='encadrements-list'),
     path('projetslists/', views.ProjetsListAPIView.as_view(), name='projets-list'),
     path('projets/<int:id_projet>/', views.ProjetDetailsAPIView.as_view(), name='projet-details'),
    
    #path('projet/<int:pk>/modify/', views.ProjetModifyAPIView.as_view(), name='projet_modify'),

# khadidja :
    path('download/', views.DownloadFileAPIView.as_view(), name='download_file'),
    path('init/',views.initialize_database , name="initialisation"),
    path('maj/', views.MajAPIView.as_view(), name="mise_a_jour"),



     path('chercheur_dashboardAutre/<int:id_chercheur>/', views.chercheur_dashboardAutre, name='chercheur_dashboard'),

    path('chercheur_dashboard/', views.chercheur_dashboard, name='chercheur_dashboard'),

]
    

