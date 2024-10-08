from django.shortcuts import render
from rest_framework.views import APIView
from .models import Projet ,Chercheur ,Encadrement,Conf_journal ,Publication , ChecheursEncadrements , ChecheursProjets
from rest_framework import viewsets
from django.http import JsonResponse
from rest_framework.response import Response
from .serializers import EncadrementDetailSerializer ,EncadrementDetailSerializer,PublicationCiteSerializer ,ChercheurProfileSerializer,PublicationDetailSerializer,ProjetSearchSerializer,ProjetListSerializer,PublicationSerializerFF,PublicationModifySerializer,ProjetDetailSerializerSecond,Conf_JournSerializerByChercheur,EncadrementSerializerByChercheur,ProjetSerializerByChercheur,PublicationSerializerByChercheur,PublicationSerializer,ConfJournalCreat,EncadrementCreatSerializer,ProjetCreatSerializer ,ProjetDetailSerializer,ChercheurCreat,EncadrementListSerializer ,ChercheurDetailSerializer ,ChercheurListSerializer  ,ConfJournalListSerializer ,ConfJournalDetailSerializer
from .serializers import ChercheurSearchSerializer, PublicationCiteSerializer2 ,ChercheurNameSerializer ,MEncadrementDetailSerializer,PublicationCiteSerializer , ProjetSerializer ,EncadrementSearchSerializer ,EncadrementSerializer ,PublicationSearchSerializer
from rest_framework import generics , permissions, status
from django.contrib.auth import authenticate, login ,logout
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from django.db import connection
from accounts.models import User
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.exceptions import PermissionDenied

from rest_framework import generics, permissions
from django.db.models import Q
from django.db.models import Count
from django.utils import timezone
from django.db.models import Max
from rest_framework.generics import RetrieveAPIView
import datetime
from django.shortcuts import redirect
from django.urls import reverse
from django.shortcuts import render
    
from django.views.decorators.csrf import csrf_exempt
from .automatisation import init_publications_from_excel_to_excel, venues_from_excel_to_excel, init_authors_from_excel_to_excel,mise_a_jour_publications_from_excel_to_excel
from django.conf import settings
from django.http import Http404, HttpResponse
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
from django.conf import settings
from pathlib import Path
import traceback
#____________________________________________________________________________________________

#____________________________________________________________________________________________

#____________________________________________________________________________________________

#____________________________________________________________________________________________ 
class ChercheurListAPIview(generics.ListAPIView):
    queryset = Chercheur.objects.all()
    serializer_class = ChercheurListSerializer
#____________________________________________________________________________________________
class ChercheurDetailAPIview(generics.RetrieveAPIView):# for show details for each chercheur 
    queryset = Chercheur.objects.all()
    serializer_class = ChercheurDetailSerializer
#____________________________________________________________________________________________
class ChercheurCreatAPIview(generics.CreateAPIView):
    queryset=Chercheur.objects.all()
    serializer_class=ChercheurCreat
   #def perform_create(self, serializer):
    #    user = self.request.user
     #   if not (user.is_superuser or user.role in ['admin','assistant']):
      #      raise PermissionDenied("Vous n'avez pas la permission d'effectuer cette action.")
       # serializer.save()




#____________________________________________________________________________________________
class ConfJournalListAPIview(generics.ListAPIView): #pour gerer l'affichage de la list des confjournal 
    queryset = Conf_journal.objects.all()
    serializer_class = ConfJournalListSerializer
#____________________________________________________________________________________________
class ConfJournalDetailAPIview(generics.RetrieveAPIView):# for show details for each chercheur 
    queryset = Conf_journal.objects.all()
    serializer_class = ConfJournalDetailSerializer 
#____________________________________________________________________________________________    
class ConfJournalCreatAPIview(generics.CreateAPIView):
    queryset = Conf_journal.objects.all()
    serializer_class = ConfJournalCreat
    permission_classes = [IsAuthenticated]

    #____________________________________________________________________________________________
class PublicationCreateAPIView1234567(APIView):
    def post(self, request):
        # Assuming the request contains data for the new publication
        data = request.data

        # Extract data for the new publication
        annee = data.get('annee')
        titre_publication = data.get('titre_publication')
        volume = data.get('volume')
        citations = data.get('citations')
        lien_publie = data.get('lien_publie')
        nombre_page = data.get('nombre_page')
        rang_chercheur = data.get('rang_chercheur')
        #get the connected chercheur id 
        chercheur_id = self.request.user.chercheur.id_chercheur if self.request.user.is_authenticated else None

        try:
            # Retrieve Chercheur using provided Chercheur ID
            chercheur = Chercheur.objects.get(id_chercheur=chercheur_id)
        except Chercheur.DoesNotExist:
            return Response({"error": "Chercheur does not exist."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Retrieve Conf_journal using provided acronym
        acronym = data.get('conf_journal_acronym')
        conf_journ=data.get('conf_journ')
        type=data.get('type')
        conf_journal = Conf_journal.objects.filter(acronyme=acronym).first()
        if not conf_journal:
            return Response({"error": "Conf_journal with provided acronym not found."}, status=status.HTTP_400_BAD_REQUEST)

        # Create the publication with annee value assigned
        publication = Publication(
            id_chercheur=chercheur,
            Conf_Journal_id=conf_journal,  # Assigning the Conf_journal object directly
            annee=annee,
            titre_publication=titre_publication,
            volume=volume,
            citations=citations,
            lien_publie=lien_publie,
            nombre_page=nombre_page,
            rang_chercheur=rang_chercheur
        )
        # Save the publication
        publication.save()
        # Serialize the created publication
        serializer = PublicationSerializer(publication)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
#_______________________________________________________________________________________________
class PublicationCreateAPIView(APIView):
    def post(self, request):
        data = request.data

        # Extract data for the new publication
        annee = data.get('annee')
        titre_publication = data.get('titre_publication')
        volume = data.get('volume')
        citations = data.get('citations')
        lien_publie = data.get('lien_publie')
        nombre_page = data.get('nombre_page')
        rang_chercheur = data.get('rang_chercheur')
        
        # Get the connected chercheur id 
        chercheur_id = self.request.user.chercheur.id_chercheur if self.request.user.is_authenticated else None
        chercheurrr = request.user.chercheur
        try:
            # Retrieve Chercheur using provided Chercheur ID
            chercheur = Chercheur.objects.get(id_chercheur=chercheur_id)
        except Chercheur.DoesNotExist:
            return Response({"error": "Chercheur does not exist."}, status=status.HTTP_400_BAD_REQUEST)
        acronym = data.get('conf_journal_acronym')
        conf_journ = data.get('conf_journ')
        if request.user.is_active:
            # Retrieve Conf_journal using provided acronym
           
        
            conf_journal = Conf_journal.objects.filter(acronyme=acronym).first()
            if not conf_journal:
                conf_journal=Conf_journal.objects.filter(nom=conf_journ).first()
                if not conf_journal: 
                    return Response({"error": "Conf_journal Does not exist with this aacronyme and name found."}, status=status.HTTP_400_BAD_REQUEST)

            # Check if a publication with the same chercheur_id, conf_journal, and titre_publication exists
            existing_publication = Publication.objects.filter(
                id_chercheur=chercheur,
                Conf_Journal_id=conf_journal,
                titre_publication=titre_publication
            ).exists()

            if existing_publication:
                return Response({"error": "Cette publication a été ajouter a ce chercheur"}, status=status.HTTP_400_BAD_REQUEST)

            # Create the publication with annee value assigned
            publication = Publication(
                id_chercheur=chercheur,
                Conf_Journal_id=conf_journal,  
                annee=annee,
                titre_publication=titre_publication,
                volume=volume,
                citations=citations,
                lien_publie=lien_publie,
                nombre_page=nombre_page,
                rang_chercheur=rang_chercheur
            )
            
            # Save the publication
            publication.save()

            # Serialize the created publication
            serializer = PublicationSerializer(publication)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        else:
            return Response({"error": "Vous devez être un chercheur actif pour créer un publication"}, status=status.HTTP_403_FORBIDDEN)

#____________________________________________________________________________________________
class EncadrementCreatAPIviewFirst(generics.CreateAPIView):
    queryset = Encadrement.objects.all()
    serializer_class = EncadrementCreatSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        data = request.data
        encadrement_data = {
            'type_encadrement': data.get('type_encadrement'),
            'intitule': data.get('intitule'),
            'role_chercheur': data.get('role_chercheur'),
            'role_chercheur2': data.get('role_chercheur2'),
            'annee_debut': data.get('annee_debut'),
            'annee_fin': data.get('annee_fin'),
            'nom_prenom_etd1': data.get('nom_prenom_etd1'),
            'nom_prenom_etd2': data.get('nom_prenom_etd2'),
        }
        chercheur_id = self.request.user.chercheur.id_chercheur if self.request.user.is_authenticated else None

        # Vérifier si un encadrement avec le même intitulé existe déjà
        existing_encadrement = Encadrement.objects.filter(intitule=encadrement_data['intitule']).first()
        chercheur1=data.get('chercheur1')
        chercheur2=data.get('chercheur2')
        if existing_encadrement:
            # Si l'encadrement existe déjà, établir la relation entre ce encadrement et le chercheur
            with connection.cursor() as cursor:
                cursor.execute("INSERT INTO lmcs_checheursencadrements (chercheur_id, encadrement_id) VALUES (%s, %s)", [chercheur_id, existing_encadrement.id_encadrement])
            # Serializer l'encadrement existant pour renvoyer en réponse
            serializer = self.get_serializer(existing_encadrement)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # Si l'encadrement n'existe pas, créer un nouvel encadrement
            encadrement_serializer = self.get_serializer(data=encadrement_data)
            encadrement_serializer.is_valid(raise_exception=True)
            encadrement = encadrement_serializer.save()
            # Établir la relation entre le nouvel encadrement et le chercheur
            with connection.cursor() as cursor:
                cursor.execute("INSERT INTO lmcs_checheursencadrements (chercheur_id, encadrement_id) VALUES (%s, %s)", [chercheur_id, encadrement.id_encadrement])
            serializer = self.get_serializer(encadrement)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

#____________________________________________________________________________________________


#____________________________________________________________________________________________
class ProjetCreateAPIViewfirstfff (generics.CreateAPIView):
    queryset = Projet.objects.all()
    serializer_class = ProjetCreatSerializer
    permission_classes = [IsAuthenticated]


    def create(self, request, *args, **kwargs):
        # Assuming the request contains data for the new projet
        data = request.data

        # Extract data for the new projet
        projet_data = {
            'titre_projet': data.get('titre_projet'),
            'chef_de_projet': data.get('chef_de_projet'),
            'domaine': data.get('domaine'),
            'annee_debut': data.get('annee_debut'),
            'annee_fin': data.get('annee_fin'),
        }

        # Manually provided Chercheur ID
        chercheur_id = self.request.user.chercheur.id_chercheur if self.request.user.is_authenticated else None


        #try:
            # Retrieve Chercheur using provided Chercheur ID
         #   chercheur = Chercheur.objects.get(id_chercheur=chercheur_id)
        #except Chercheur.DoesNotExist:
         #   return Response({"error": "Chercheur with provided ID does not exist."}, status=status.HTTP_400_BAD_REQUEST)

        # Check if Projet with the same title exist in the projet table 
        existing_projet = Projet.objects.filter(titre_projet=projet_data['titre_projet']).first()
        projet = None  # to avoid the erreur 

        if existing_projet:
            # If Projet exists, establish the relationship with the chercheur
            with connection.cursor() as cursor:
                cursor.execute("INSERT INTO lmcs_checheursprojets (id_chercheur_id, id_projet_id) VALUES (%s, %s)", [chercheur_id, existing_projet.id_projet])
        else:
            # If Projet doesn't exist, create it
            projet_serializer = self.get_serializer(data=projet_data)
            projet_serializer.is_valid(raise_exception=True)
            projet = projet_serializer.save()

            # Establish the relationship with the chercheur
            with connection.cursor() as cursor:
                cursor.execute("INSERT INTO lmcs_checheursprojets (id_chercheur_id, id_projet_id) VALUES (%s, %s)", [chercheur_id, projet.id_projet])

        # Serialize the created Projet
        serializer = self.get_serializer(projet)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

#____________________________________________________________________________________________

class ProjetCreateAPIView22(generics.CreateAPIView):
    queryset = Projet.objects.all()
    serializer_class = ProjetCreatSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        data = request.data

        # Manually provided Chercheur ID
        chercheur_id = None
        if request.user.is_authenticated:
            chercheur = request.user.chercheur
            if chercheur:
                chercheur_id = chercheur.id_chercheur

        if chercheur_id: # the chercheur will create the project
            data = request.data

            # Extract data for the new projet
            projet_data = {
                'titre_projet': data.get('titre_projet'),
                'chef_de_projet': data.get('chef_de_projet'),
                'domaine': data.get('domaine'),
                'annee_debut': data.get('annee_debut'),
                'annee_fin': data.get('annee_fin'),
            }

            # 
            chercheur_id = self.request.user.chercheur.id_chercheur if self.request.user.is_authenticated else None


            # Check if Projet with the same title exist in the projet table 
            existing_projet = Projet.objects.filter(titre_projet=projet_data['titre_projet']).first()
            projet = None  # to avoid the erreur 

            if existing_projet:
                # If Projet exists, establish the relationship with the chercheur
                with connection.cursor() as cursor:
                    cursor.execute("INSERT INTO lmcs_checheursprojets (id_chercheur_id, id_projet_id) VALUES (%s, %s)", [chercheur_id, existing_projet.id_projet])
            else:
                # If Projet doesn't exist, create it
                projet_serializer = self.get_serializer(data=projet_data)
                projet_serializer.is_valid(raise_exception=True)
                projet = projet_serializer.save()

                # Establish the relationship with the chercheur
                with connection.cursor() as cursor:
                    cursor.execute("INSERT INTO lmcs_checheursprojets (id_chercheur_id, id_projet_id) VALUES (%s, %s)", [chercheur_id, projet.id_projet])

            # Serialize the created Projet
            serializer = self.get_serializer(projet)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        else:
            data = request.data

            # Assistant creating the projet
            # Extract projet and chercheur data from the request
            titre_projet = data.get('titre_projet')
            chef_de_projet = data.get('chef_de_projet')
            domaine = data.get('domaine')
            annee_debut = data.get('annee_debut')
            annee_fin = data.get('annee_fin')
            membres = data.get('membres', [])

            existing_projet = Projet.objects.filter(titre_projet=titre_projet).first()
            projet = None  # to avoid the erreur 

            if existing_projet: 
                pass 
            else : 
                projet = Projet.objects.create(titre_projet=titre_projet,
                                            chef_de_projet=chef_de_projet,
                                            domaine=domaine,
                                            annee_debut=annee_debut,
                                            annee_fin=annee_fin)

            # Establish relationships between chercheurs and projet
            cpt=0 
            for membre in membres:
        
                nom_chercheur, prenom_chercheur = membre.split()
                chercheur = Chercheur.objects.filter(nom_chercheur=nom_chercheur, prenom_chercheur=prenom_chercheur).first()
                if chercheur:
                    cpt += 1
                    # Chercheur exists, establish the relationship
                    ChecheursProjets.objects.create(id_chercheur_id=chercheur, id_projet_id=projet)
                else:
                    if cpt==0 : 
                         return Response({"error": "You should add at least one chercheur"}, status=status.HTTP_400_BAD_REQUEST)
                    

            # Return the response
            serializer = self.get_serializer(projet)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
#____________________________________________________________________________________________
            
#____________________________________________________________________________________________



#chercheur id using authentification 
class PublicationByChercheurAPIView(generics.ListAPIView):
    serializer_class = PublicationSerializerByChercheur
   
   

    def get_queryset(self):
        # Get the chercheur_id from the authenticated user
        chercheur_id = self.request.user.chercheur.id_chercheur if self.request.user.is_authenticated else None
        if chercheur_id:
            return Publication.objects.filter(id_chercheur=chercheur_id)
        else:
            return Publication.objects.none()
        

class PublicationListADMINAPIView(generics.ListAPIView):
    serializer_class = PublicationSerializer
    

    def get_queryset(self):
        return Publication.objects.all()
    

class PublicationModifyAPIView9dim(generics.RetrieveUpdateAPIView):
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


class PublicationModifyAPIView(generics.RetrieveUpdateAPIView):
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializerFF
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Publication.objects.select_related('Conf_Journal_id').all()
    
    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        
        acronyme = request.data.get('conf_journal_acronyme')
        conf_journal_title = request.data.get('conf_journal_nom')
        
        if acronyme:
            try:
                conf_journal = Conf_journal.objects.get(acronyme=acronyme)
            except Conf_journal.DoesNotExist:
                conf_journal = None
        elif conf_journal_title:
            try:
                conf_journal = Conf_journal.objects.get(nom=conf_journal_title)
            except Conf_journal.DoesNotExist:
                conf_journal = None
        else:
            conf_journal = None
                
        if conf_journal:
            instance.Conf_Journal_id = conf_journal
        
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

        

class PublicationDeleteAPIView(generics.DestroyAPIView):
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer
    permission_classes = [IsAuthenticated]











class ConfjournModify(generics.RetrieveUpdateAPIView):
    queryset = Conf_journal.objects.all()
    serializer_class = Conf_JournSerializerByChercheur
    permission_classes = [IsAuthenticated]



#-----------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------
#--------------------------------- Les API des projets ----------------------------------------
#---------------------------------------------------------------------------------------------
#Afficher les projet de chercheur connecté avec la possibilité de faire un modification sur le projet , ou bien le supprimer  
    
class ProjetByChercheurAPIView(generics.ListAPIView):
    serializer_class = ProjetSerializerByChercheur
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Get the chercheur_id from the authenticated user
        if self.request.user.is_authenticated:
            chercheur_id = self.request.user.chercheur.id_chercheur 
        
        if chercheur_id:
            # Retrieve all project IDs associated with the chercheur
            projet_ids = ChecheursProjets.objects.filter(id_chercheur_id=chercheur_id).values_list('id_projet', flat=True)
         # Retrieve projects corresponding to the project IDs
            return Projet.objects.filter(id_projet__in=projet_ids)
        else:
            return Projet.objects.none()
        




class ProjetListADMINAPIView(generics.ListAPIView):
    serializer_class = ProjetSerializer
   
    def get_queryset(self):
        return Projet.objects.all()
#///////////////////////////////////////////////////////////////////////////////////////////
#///////////////////////////////////////////////////////////////////////////////////////////   
class ProjetByChercheurAPIViewWRONG(generics.ListAPIView):
    serializer_class = ProjetSerializerByChercheur


    def get_queryset(self):
        # Get the chercheur_id from the authenticated user
        
        chercheur_id = 1
        if chercheur_id :
            # Retrieve all project IDs associated with the chercheur
            projet_ids = ChecheursProjets.objects.filter(id_chercheur_id=chercheur_id).values_list('id_projet', flat=True)
         # Retrieve projects corresponding to the project IDs
            return Projet.objects.filter(id_projet__in=projet_ids)
        else:
            return Projet.objects.none()
        
#///////////////////////////////////////////////////////////////////////////////////////////      
# ////////////////////// pour modifier les information de projet ///////////////////////////
        

class ProjetModifyAPIViewFirst(generics.UpdateAPIView):
    queryset = Projet.objects.all()
    serializer_class = ProjetSerializerByChercheur
    permission_classes = [IsAuthenticated]


    
    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        # Response data indicating successful modification
        response_data = {
            "status": "Modification applied successfully"
        }

        return Response(response_data, status=status.HTTP_200_OK)
    

class ProjetModifyAPIView(generics.RetrieveUpdateAPIView):
    queryset = Projet.objects.all()
    serializer_class = ProjetDetailSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
#///////////////////////////////////////////////////////////////////////////////////////////      
# ////////////////////// pour supprimer le projet ///////////////////////////

    
class ProjetDeleteAPIView(generics.DestroyAPIView):
    queryset = Projet.objects.all()
    serializer_class = ProjetSerializerByChercheur
    permission_classes = [IsAuthenticated]

#///////////////////////////////////////////////////////////////////////////////////////////      
# ////////////////////// pour creer projet soit par chercheur , ou par assiastant  ///////////////////////////

class ProjetCreateAPIView(generics.CreateAPIView):
    queryset = Projet.objects.all()
    serializer_class = ProjetCreatSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        data = request.data
        projet_data = {
            'titre_projet': data.get('titre_projet'),
            'chef_de_projet': data.get('chef_de_projet'),
            'domaine': data.get('domaine'),
            'annee_debut': data.get('annee_debut'),
            'annee_fin': data.get('annee_fin'),
        }

        # Get the connected user
        user = self.request.user

        if hasattr(user, 'chercheur') and user.chercheur is not None :  # Check if the user is a researcher
            chercheur_id = user.chercheur.id_chercheur
            chercheurrr=user.chercheur      
            if request.user.is_active:
                existing_projet = Projet.objects.filter(titre_projet=projet_data['titre_projet']).first()
                members = data.get('members', [])
                if existing_projet:
                    # If the project exists, establish the relationship with the researcher
                    with connection.cursor() as cursor:
                        cursor.execute("INSERT INTO lmcs_checheursprojets (id_chercheur_id, id_projet_id) VALUES (%s, %s)", [chercheur_id, existing_projet.id_projet])
                else:
                    # If the project doesn't exist, create it
                    projet_serializer = self.get_serializer(data=projet_data)
                    projet_serializer.is_valid(raise_exception=True)
                    projet = projet_serializer.save()

                    # Establish the relationship with the researcher
                    with connection.cursor() as cursor:
                        cursor.execute("INSERT INTO lmcs_checheursprojets (id_chercheur_id, id_projet_id) VALUES (%s, %s)", [chercheur_id, projet.id_projet])

                serializer = self.get_serializer(projet)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            
            else:
                return Response({"error": "Vous devez être un chercheur actif pour créer un projet"}, status=status.HTTP_403_FORBIDDEN)
            
        else:  # User is an assistant or admin 
            members = data.get('members', [])
            if not members:
                return Response({"error": "At least one member should be specified"}, status=status.HTTP_400_BAD_REQUEST)

            existing_projet = Projet.objects.filter(titre_projet=projet_data['titre_projet']).first()

            if existing_projet:
                # If the project exists, establish relationships with specified members
                for member_name in members:
                    try:
                        chercheur = Chercheur.objects.get(nom_chercheur=member_name.split()[0],prenom_chercheur=member_name.split()[1])
                        if not ChecheursProjets.objects.filter(id_chercheur_id=chercheur.id_chercheur, id_projet_id=existing_projet.id_projet).exists():
                            with connection.cursor() as cursor:
                                cursor.execute("INSERT INTO lmcs_checheursprojets (id_chercheur_id, id_projet_id) VALUES (%s, %s)", [chercheur.id_chercheur, existing_projet.id_projet])
                    except Chercheur.DoesNotExist:
                        return Response({"error": f"Chercheur '{member_name}' does not exist"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                # If the project doesn't exist, create it and establish relationships with specified members
                projet_serializer = self.get_serializer(data=projet_data)
                projet_serializer.is_valid(raise_exception=True)
                existing_projet = projet_serializer.save()
                
                for member_name in members:
                    member_name = member_name.strip()  # Remove extra spaces
                    member_parts = member_name.split()
                    if len(member_parts) < 2:
                        return Response({"error": f"Invalid member name: {member_name}"}, status=status.HTTP_400_BAD_REQUEST)
    
                    first_name = member_parts[0]
                    last_name = member_parts[1]

                    try:
                          # Searching for the chercheur using both first name and last name
                        chercheur = Chercheur.objects.get(nom_chercheur=first_name, prenom_chercheur=last_name)
                        with connection.cursor() as cursor:
                            cursor.execute("INSERT INTO lmcs_checheursprojets (id_chercheur_id, id_projet_id) VALUES (%s, %s)", [chercheur.id_chercheur, existing_projet.id_projet])
                    except Chercheur.DoesNotExist:
                        return Response({"error": f"Chercheur '{member_name}' does not exist"}, status=status.HTTP_400_BAD_REQUEST)
            serializer = self.get_serializer(existing_projet)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        


# publication creation by admin or assistent 
class PublicationCreateADMINAPIView(APIView):
    def post(self, request):
        data = request.data

        # Check if the user is not a chercheur
        if not hasattr(request.user, 'chercheur'):
            return Response({"error": "Vous devez être un chercheur pour créer une publication"}, status=status.HTTP_403_FORBIDDEN)

        # Extract data for the new publication
        nom_chercheur = data.get('nom_chercheur')
        prenom_chercheur = data.get('prenom_chercheur')
        annee = data.get('annee')
        titre_publication = data.get('titre_publication')
        volume = data.get('volume')
        citations = data.get('citations')
        lien_publie = data.get('lien_publie')
        nombre_page = data.get('nombre_page')
        rang_chercheur = data.get('rang_chercheur')
        acronym = data.get('conf_journal_acronym')
        conf_journ = data.get('conf_journ')

        # Retrieve Chercheur using provided name and prenom
        try:
            chercheur = Chercheur.objects.get(nom_chercheur=nom_chercheur, prenom_chercheur=prenom_chercheur)
        except Chercheur.DoesNotExist:
            return Response({"error": "Chercheur not found"}, status=status.HTTP_400_BAD_REQUEST)

        
        # Get Conf_journal using provided acronym
        conf_journal = Conf_journal.objects.filter(acronyme=acronym).first()
        if not conf_journal:
            conf_journal = Conf_journal.objects.filter(nom=conf_journ).first()
            if not conf_journal:
                return Response({"error": "Conf_journal not found"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if a publication with the same chercheur_id, conf_journal, and titre_publication exists
        existing_publication = Publication.objects.filter(
            id_chercheur=chercheur,
            Conf_Journal_id=conf_journal,
            titre_publication=titre_publication
        ).exists()

        if existing_publication:
            return Response({"error": "Publication with the same chercheur, conf_journal, and titre_publication already exists."}, status=status.HTTP_400_BAD_REQUEST)

        # Create the publication with annee value assigned
        publication = Publication(
            id_chercheur=chercheur,
            Conf_Journal_id=conf_journal,
            annee=annee,
            titre_publication=titre_publication,
            volume=volume,
            citations=citations,
            lien_publie=lien_publie,
            nombre_page=nombre_page,
            rang_chercheur=rang_chercheur
        )

        # Save the publication
        publication.save()

        # Serialize the created publication
        serializer = PublicationSerializer(publication)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
        
#/////////////////////////////////////////////////////////////////////////////////////////////   
# ////////////////////// pour lister les projet sans detail  /////////////////////////////////

class ProjetListAPIview(generics.ListAPIView):
    queryset = Projet.objects.all()
    serializer_class = ProjetListSerializer

#///////////////////////////////////////////////////////////////////////////////////////////////     
# ////////////////////// pour afficher le detail de projet selectioné ///////////////////////////

class ProjetDetailAPIview(generics.RetrieveAPIView):
    queryset = Projet.objects.all()
    serializer_class = ProjetDetailSerializer
    permission_classes = [IsAuthenticated]


class PubDetailModifAPIview(generics.RetrieveAPIView):
    queryset = Publication.objects.all()
    serializer_class = PublicationModifySerializer
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        conf_journal = instance.Conf_Journal_id
        publication_serializer = self.get_serializer(instance)
        conf_journal_serializer = Conf_JournSerializerByChercheur(conf_journal)
        return Response({
            'publication': publication_serializer.data,
            'conf_journal': conf_journal_serializer.data
        })
#--------------------------------- La fin des API des projets ------------------------------------
#-------------------------------------------------------------------------------------------------
#-------------------------------------------------------------------------------------------------
#-------------------------------------------------------------------------------------------------
#--------------------------------- Les API des Encadrements --------------------------------------
#-------------------------------------------------------------------------------------------------
#Afficher les encadrement de chercheur connecté avec la possibilité de faire un modification sur l'encadrement , ou bien le supprimer  
    
class EncadrementByChercheurAPIView(generics.ListAPIView):
    serializer_class = EncadrementSerializerByChercheur
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        chercheur_id = self.request.user.chercheur.id_chercheur if self.request.user.is_authenticated else None
        if chercheur_id:
            # Step 1: Retrieve all project IDs associated with the chercheur
            encadrements_ids = ChecheursEncadrements.objects.filter(chercheur_id=chercheur_id).values_list('encadrement_id', flat=True)
            # Step 2: Retrieve projects corresponding to the project IDs
            return Encadrement.objects.filter(id_encadrement__in=encadrements_ids)
        else:
            return Encadrement.objects.none()
        


class EncadrementListADMINAPIView(generics.ListAPIView):
    serializer_class = EncadrementSerializerByChercheur
    

    def get_queryset(self):
        return Encadrement.objects.all()
        
# ////////////////////// pour modifier les information de l'encadrement ///////////////////////////

class EncadrementModifyAPIView(generics.RetrieveUpdateAPIView):
    queryset = Encadrement.objects.all()
    serializer_class = EncadrementDetailSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
# ////////////////////// pour supprimer l'encadrement ///////////////////////////
    
class EncadrementDeleteAPIView(generics.DestroyAPIView):
    queryset = Encadrement.objects.all()
    serializer_class = EncadrementSerializerByChercheur
    permission_classes = [IsAuthenticated]

# ////////////////////// pour lister les encadrement sans detail  ///////////////////////////

class EncadrementListAPIview(generics.ListAPIView):
    queryset=Encadrement.objects.all()
    serializer_class=EncadrementListSerializer    

# ////////////////////// pour afficher le detail de l'encadrement selectioné ///////////////////////////

class EncadrementDetailAPIview(generics.RetrieveAPIView):
    queryset = Encadrement.objects.all()
    serializer_class = EncadrementDetailSerializer

# ////////////////////// pour creer projet soit par chercheur , ou par assiastant  ///////////////////////////
    
class EncadrementCreatAPIview(generics.CreateAPIView):
    queryset = Encadrement.objects.all()
    serializer_class = EncadrementCreatSerializer
    

    def create(self, request):
        data = request.data
        
        # Check if the user is authenticated and retrieve their corresponding chercheur id
        chercheur_id = None
        if request.user.is_authenticated:
            chercheur = request.user.chercheur
            if chercheur:
                chercheur_id = chercheur.id_chercheur
        
        chercheur2exist=0
        
        # If chercheur_id is not None, it means the user is a chercheur
        if chercheur_id:
                 
            if request.user.is_active:
                data = request.data
                encadrement_data = {
                    'type_encadrement': data.get('type_encadrement'),
                    'intitule': data.get('intitule'),
                    'role_chercheur': data.get('role_chercheur'),
                    'role_chercheur2': data.get('role_chercheur2'),
                    'annee_debut': data.get('annee_debut'),
                    'annee_fin': data.get('annee_fin'),
                    'nom_prenom_etd1': data.get('nom_prenom_etd1'),
                    'nom_prenom_etd2': data.get('nom_prenom_etd2'),
                }
                # Vérifier si un encadrement avec le même intitulé existe déjà
                existing_encadrement = Encadrement.objects.filter(intitule=encadrement_data['intitule']).first()
                
                if existing_encadrement:
                    # Si l'encadrement existe déjà, établir la relation entre ce encadrement et le chercheur
                    with connection.cursor() as cursor:
                        cursor.execute("INSERT INTO lmcs_checheursencadrements (chercheur_id, encadrement_id) VALUES (%s, %s)", [chercheur_id, existing_encadrement.id_encadrement])
                    # Serializer l'encadrement existant pour renvoyer en réponse
                    serializer = self.get_serializer(existing_encadrement)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    # Si l'encadrement n'existe pas, créer un nouvel encadrement
                    encadrement_serializer = self.get_serializer(data=encadrement_data)
                    encadrement_serializer.is_valid(raise_exception=True)
                    encadrement = encadrement_serializer.save()
                    # Établir la relation entre le nouvel encadrement et le chercheur
                    with connection.cursor() as cursor:
                        cursor.execute("INSERT INTO lmcs_checheursencadrements (chercheur_id, encadrement_id) VALUES (%s, %s)", [chercheur_id, encadrement.id_encadrement])
                    serializer = self.get_serializer(encadrement)
                    return Response(serializer.data, status=status.HTTP_201_CREATED)   
            else:
                return Response({"error": "Vous devez être un chercheur actif pour créer un encadrement"}, status=status.HTTP_403_FORBIDDEN)

        else:
            chercheur1=data.get('chercheur1')
            chercheur2=data.get('chercheur2')
            # If chercheur_id is None, it means the user is an assistant or an admin 
            # Retrieve encadrement data from request
            encadrement_data = {
                'type_encadrement': data.get('type_encadrement'),
                'intitule': data.get('intitule'),
                'annee_debut': data.get('annee_debut'),
                'annee_fin': data.get('annee_fin'),
                'nom_prenom_etd1': data.get('nom_prenom_etd1'),
                'nom_prenom_etd2': data.get('nom_prenom_etd2'),
                'role_chercheur': data.get('role_chercheur'),
                'role_chercheur2': data.get('role_chercheur2'),
            }

            # Check if encadrement with the same title exists
            existing_encadrement = Encadrement.objects.filter(intitule=encadrement_data['intitule']).first()
            chercheur1 = data.get('chercheur1')
            if not chercheur1 : 
                return Response({"error": "you should give at least one chercheur "}, status=status.HTTP_400_BAD_REQUEST)
            if ' ' in chercheur1:
                try:
                    chercheur1_id = Chercheur.objects.get(nom_chercheur=chercheur1.split()[0], prenom_chercheur=chercheur1.split()[1]).id_chercheur
                except Chercheur.DoesNotExist:
                    return Response({"error": "Chercheur 1 does not exist"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"error": "chercheur full name should containe space"}, status=status.HTTP_400_BAD_REQUEST)
            
            chercheur2 = data.get('chercheur2')
            if chercheur2:
                chercheur2exist=1
                chercheur2_split = chercheur2.split()
                if len(chercheur2_split) >= 2:
                    try:
                        chercheur2_id = Chercheur.objects.get(nom_chercheur=chercheur2_split[0], prenom_chercheur=chercheur2_split[1]).id_chercheur
                    except Chercheur.DoesNotExist:
                        return Response({"error": "Chercheur 2 does not exist"}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({"error": "Chercheur 2 full name should contain at least two parts separated by a space"}, status=status.HTTP_400_BAD_REQUEST)
            else :
                chercheur2exist=0

            try:
                chercheur1_id = Chercheur.objects.get(nom_chercheur=chercheur1.split()[0], prenom_chercheur=chercheur1.split()[1]).id_chercheur
            except Chercheur.DoesNotExist:
                 return Response({"error": "Chercheur 1 does not exist"}, status=status.HTTP_400_BAD_REQUEST)

            if chercheur2exist==1 :
                try:
                    chercheur2_id = Chercheur.objects.get(nom_chercheur=chercheur2.split()[0], prenom_chercheur=chercheur2.split()[1]).id_chercheur
                except Chercheur.DoesNotExist:
                    return Response({"error": "Chercheur 2 does not exist"}, status=status.HTTP_400_BAD_REQUEST)

           #chercheur1_id = Chercheur.objects.filter(nom_chercheur=chercheur1.split()[0], prenom_chercheur=chercheur1.split()[1]).first().id_chercheur
           # chercheur2_id = Chercheur.objects.filter(nom_chercheur=chercheur2.split()[0], prenom_chercheur=chercheur2.split()[1]).first().id_chercheur


            if existing_encadrement:
                # Check if relations already exist
                if not ChecheursEncadrements.objects.filter(chercheur_id=chercheur1_id, encadrement_id=existing_encadrement.id_encadrement).exists():
                    ChecheursEncadrements.objects.create(chercheur_id=chercheur1_id, encadrement_id=existing_encadrement.id_encadrement)
                if chercheur2exist==1 : 
                    if not ChecheursEncadrements.objects.filter(chercheur_id=chercheur2_id, encadrement_id=existing_encadrement.id_encadrement).exists():
                        ChecheursEncadrements.objects.create(chercheur_id=chercheur2_id, encadrement_id=existing_encadrement.id_encadrement)

                serializer = self.get_serializer(existing_encadrement)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                # If encadrement does not exist, create new encadrement
                encadrement_serializer = self.get_serializer(data=encadrement_data)
                encadrement_serializer.is_valid(raise_exception=True)
                encadrement = encadrement_serializer.save()

                # Retrieve chercheur ids using their full names
                #chercheur1_id = Chercheur.objects.filter(nom_chercheur=chercheur1.split()[0], prenom_chercheur=chercheur1.split()[1]).first().id_chercheur
                #chercheur2_id = Chercheur.objects.filter(nom_chercheur=chercheur2.split()[0], prenom_chercheur=chercheur2.split()[1]).first().id_chercheur

                # Establish relations between chercheurs and encadrement
                ChecheursEncadrements.objects.create(chercheur_id=chercheur1_id, encadrement_id=encadrement.id_encadrement)
                ChecheursEncadrements.objects.create(chercheur_id=chercheur2_id, encadrement_id=encadrement.id_encadrement)

                serializer = self.get_serializer(encadrement)
                return Response(serializer.data, status=status.HTTP_201_CREATED)


#--------------------------------- La fin des API des encadrement ------------------------------------
#-------------------------------------------------------------------------------------------------
#-------------------------------------------------------------------------------------------------
#-------------------------------------------------------------------------------------------------
#--------------------------------- Les API des Publications --------------------------------------
#-------------------------------------------------------------------------------------------------
#Afficher les encadrement de chercheur connecté avec la possibilité de faire un modification sur l'encadrement , ou bien le supprimer  


  

@api_view(['GET', 'POST'])
def get_statistics(request): 
    critere1 = request.data.get('critere1') or request.GET.get('critere1')
    critere2 = request.data.get('critere2') or request.GET.get('critere2')
    date1 = request.data.get('date1')
    date2 = request.data.get('date2')
    data = {}

    # Initialize data dictionary
  

    if critere1 == 'chercheur':
        # Number total des chercheurs dans le labo 
        total_researchers = Chercheur.objects.all().count()
        
        # Distribution of researchers by quality
        distribution = {
            'Enseignant-Chercheur': Chercheur.objects.filter(Qualite='Enseignant-Chercheur').count(),
            'Chercheur': Chercheur.objects.filter(Qualite='Chercheur').count(),
            'Doctorant': Chercheur.objects.filter(Qualite='Doctorant').count(),
            'Autre': Chercheur.objects.filter(Qualite='Autre').count(),
        }
        
        # Top 4 researchers 
        top_researchers = Chercheur.objects.order_by('-h_index')[:4]
        top_researchers_data = [{f"{chercheur.nom_chercheur} {chercheur.prenom_chercheur}": chercheur.h_index} for chercheur in top_researchers]

        data = {
            'total_researchers': total_researchers,
            'distribution': distribution,
            'top_researchers': top_researchers_data
        }
        
        if critere2 == 'diplome':
            diplomas = {
                'Licence': Chercheur.objects.filter(diplome='Licence').count(),
                'Master': Chercheur.objects.filter(diplome='Master').count(),
                'Doctorat': Chercheur.objects.filter(diplome='Doctorat').count(),
                'Ingéniorat': Chercheur.objects.filter(diplome='Ingéniorat').count(),
                'Diplôme d''Études Supérieures': Chercheur.objects.filter(diplome='Diplôme d''Études Supérieures').count(),
                'Diplôme de Formation Approfondie': Chercheur.objects.filter(diplome='Diplôme de Formation Approfondie').count(),
                'Diplôme d''Études Approfondies': Chercheur.objects.filter(diplome='Diplôme d''Études Approfondies').count(),
                'Autre': Chercheur.objects.filter(diplome='Autre').count()
            }
            data['diplomas'] = diplomas
            
        elif critere2 == 'etablissement':
            esi_count = Chercheur.objects.filter(etablissement='esi').count()
            usthb_count = Chercheur.objects.filter(etablissement='usthb').count()
            other_count = total_researchers - esi_count - usthb_count
            data['esi_count'] = esi_count
            data['other_count'] = other_count 
            data['usthb_count']=usthb_count
            
        elif critere2 == 'grade_ensignement':
            grades = {
                'Professeur': Chercheur.objects.filter(grade_ensignement='Professeur').count(),
                'MCA': Chercheur.objects.filter(grade_ensignement='MCA').count(),
                'MCB': Chercheur.objects.filter(grade_ensignement='MCB').count(),
                'MAA': Chercheur.objects.filter(grade_ensignement='MAA').count(),
                'MAB': Chercheur.objects.filter(grade_ensignement='MAB').count(),
                'Doctorant': Chercheur.objects.filter(grade_ensignement='Doctorant').count(),
                'NULL': Chercheur.objects.filter(grade_ensignement='NULL').count()
            }
            data['grades'] = grades
        
        elif critere2 == 'grade_recherche':
            grades_recherche = {
                'Directeur de recherche': Chercheur.objects.filter(grade_recherche='Directeur de recherche').count(),
                'Maître de recherche': Chercheur.objects.filter(grade_recherche='Maître de recherche').count(),
                'NULL': Chercheur.objects.filter(grade_recherche='NULL').count()
            }
            data['grades'] = grades_recherche

        elif critere2 == 'sexe':
            sexe={
                'homme':Chercheur.objects.filter(sexe='Homme').count(),
                'Femme':Chercheur.objects.filter(sexe='Femme').count()
            }
            data['sexe']=sexe


    elif critere1 == 'publication':
        # Number total des publications
        publications = Publication.objects.all()
        if date1:
            publications = publications.filter(annee__gte=date1)
            if date2:
                publications = publications.filter(annee__lte=date2)

        total_publications = publications.count()

        # Top 4 publications
        top_publications = publications.order_by('-citations')[:4]
        top_publications_data = [{publication.titre_publication: publication.citations} for publication in top_publications]

        data = {
            'total_publications': total_publications,
            'top_publications': top_publications_data
        }
        #ratio de publication using l'annee
        ratio_pub={
            '2019':Publication.objects.filter(annee='2019').count(),
            '2020':Publication.objects.filter(annee='2020').count(),
            '2021':Publication.objects.filter(annee='2021').count(),
            '2022':Publication.objects.filter(annee='2022').count(),
            '2023':Publication.objects.filter(annee='2023').count(),
            '2024':Publication.objects.filter(annee='2024').count(),
        }
        data['ratio_pub']=ratio_pub
        
        if critere2 == 'type':
            conference_count = publications.filter(Conf_Journal_id__p_type='Conférence').count()
            journal_count = publications.filter(Conf_Journal_id__p_type='Journal').count()
            data['conference_count'] = conference_count
            data['journal_count'] = journal_count

        elif critere2 == 'ecrit-par':
            chercheur_nom = request.data.get('nom') or request.GET.get('nom')
            chercheur_prenom = request.data.get('prenom') or request.GET.get('prenom')
            chercheur = Chercheur.objects.get(nom_chercheur=chercheur_nom, prenom_chercheur=chercheur_prenom)
            chercheur_publications = publications.filter(id_chercheur=chercheur.id_chercheur)
            most_cited_publication = chercheur_publications.order_by('-citations').first()
            data['chercheur_publication_count'] = chercheur_publications.count()
            if most_cited_publication:
                data['most_cited_publication'] = {
                    'titre': most_cited_publication.titre_publication,
                    'citations': most_cited_publication.citations,
                    'lien': most_cited_publication.lien_publie #il faut la modifier comme dans le frontend 
                }

    elif critere1 == 'Encadrement':

        encadrements = Encadrement.objects.all()
        if date1:
            encadrements = encadrements.filter(annee_debut__gte=date1)
            if date2:
                encadrements = encadrements.filter(annee_debut__lte=date2)

        # Nombre total des encadrements
        total_encadrements = encadrements.count()
        
        # Distribution des encadreurs et co-encadreurs
        distribution_roles = {
            'Encadreur': encadrements.filter(role_chercheur='encadreur').count(),
            'Co-encadreur': encadrements.filter(role_chercheur='co_encadreur').count()
        }
        
        data = {
            'total_encadrements': total_encadrements,
            'distribution_roles': distribution_roles
        }

        ratio_encadrement={
            '2019':Encadrement.objects.filter(annee_debut='2019').count(),
            '2020':Encadrement.objects.filter(annee_debut='2020').count(),
            '2021':Encadrement.objects.filter(annee_debut='2021').count(),
            '2022':Encadrement.objects.filter(annee_debut='2022').count(),
            '2023':Encadrement.objects.filter(annee_debut='2023').count(),
            '2024':Encadrement.objects.filter(annee_debut='2024').count(),
        }
        data['ratio_encadrement']=ratio_encadrement
        
        if critere2 == 'type':
            # Nombre d'encadrements par type
            encadrements_par_type = {
                'PFE': encadrements.filter(type_encadrement='PFE').count(),
                'Master': encadrements.filter(type_encadrement='Master').count(),
                'Doctorat': encadrements.filter(type_encadrement='Doctorat').count(),
                'Autre': encadrements.filter(type_encadrement='Autre').count()
            }
            data['encadrements_par_type'] = encadrements_par_type
            
        elif critere2 == 'chercheur':


            # Récupérer le nom et prénom du chercheur
            nom_complet = request.data.get('nom_complet') or request.GET.get('nom_complet')
            chercheur_nom, chercheur_prenom = nom_complet.split(' ', 1) 
            
            # Récupérer l'ID du chercheur
            chercheur = Chercheur.objects.get(nom_chercheur=chercheur_nom, prenom_chercheur=chercheur_prenom)
            
            # Récupérer le nombre d'encadrements où le chercheur est encadreur ou co-encadreur
            encadrements_encadreur = encadrements.filter(role_chercheur='encadreur', chercheur=chercheur).count()
            encadrements_co_encadreur = encadrements.filter(role_chercheur='co_encadreur', chercheur=chercheur).count()
            
            somme=encadrements_encadreur+encadrements_co_encadreur
            data['encadrements_par_chercheur'] = {
                'encadrements_encadreur': encadrements_encadreur,
                'encadrements_co_encadreur': encadrements_co_encadreur,
                'somme':somme
            }
    
    elif critere1 == 'Projet':
        # Nombre total des projets
        projets=Projet.objects.all()
        if date1:
            projets = projets.filter(annee_debut__gte=date1)
            if date2:
                projets = projets.filter(annee_debut__lte=date2)

        total_projets = projets.count()
        
        data = {
            'total_projets': total_projets
        }
        # Ratio de projet using anne de debut 
        ratio_projet={
            '2019':Projet.objects.filter(annee_debut='2019').count(),
            '2020':Projet.objects.filter(annee_debut='2020').count(),
            '2021':Projet.objects.filter(annee_debut='2021').count(),
            '2022':Projet.objects.filter(annee_debut='2022').count(),
            '2023':Projet.objects.filter(annee_debut='2023').count(),
            '2024':Projet.objects.filter(annee_debut='2024').count(),
        }
        data['ratio_projet']=ratio_projet
        equipe_counts = {
            'EIAH': Chercheur.objects.filter(equipe__contains='EIAH').count(),
            'IMAGE': Chercheur.objects.filter(equipe__contains='IMAGE').count(),
            'MSI': Chercheur.objects.filter(equipe__contains='MSI').count(),
            'OPT': Chercheur.objects.filter(equipe__contains='OPT').count(),
            'CoDesign': Chercheur.objects.filter(equipe__contains='CoDesign').count(),
            'SURES': Chercheur.objects.filter(equipe__contains='SURES').count()
        }
        data['equipe_counts'] = equipe_counts
        if critere2 == 'chercheur':
            # Récupérer le nom et prénom du chercheur
            chercheur_nom = request.data.get('nom') or request.GET.get('nom')
            chercheur_prenom = request.data.get('prenom') or request.GET.get('prenom')
            chercheur_full_name = f"{chercheur_nom} {chercheur_prenom}"
            try:
                chercheur = Chercheur.objects.get(nom_chercheur=chercheur_nom, prenom_chercheur=chercheur_prenom)
            except Chercheur.DoesNotExist:
                return Response({'error': f"The researcher '{chercheur_full_name}' does not exist."}, status=404)
            # Récupérer l'ID du chercheur
            #chercheur = Chercheur.objects.get(nom_chercheur=chercheur_nom, prenom_chercheur=chercheur_prenom)
            
            # Récupérer les projets associés au chercheur
            projets_chercheur = chercheur.projet.all()
            if date1 : 
                projets_chercheur = projets_chercheur.filter(annee_debut__gte=date1)
                if date2: 
                    projets_chercheur = projets_chercheur.filter(annee_debut__lte=date2)
            
            # Initialiser les compteurs
            chef_de_projet_count = 0
            membre_projet_count = 0
            
            # Compter les projets où le chercheur est chef de projet ou membre
            for projet in projets_chercheur:
                if projet.chef_de_projet == f"{chercheur_nom} {chercheur_prenom}":
                    chef_de_projet_count += 1
                else:
                    membre_projet_count += 1
            
            data['chef_de_projet_count'] = chef_de_projet_count
            data['membre_projet_count'] = membre_projet_count
    
    return Response(data) 




####################################################RECHEZRCHE##################################################################

class ChercheurSearchAPIView(generics.ListAPIView):
    serializer_class = ChercheurSearchSerializer
   # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Chercheur.objects.all()

        # Filter by grade_ensignement
        grade_ensignement = self.request.GET.get('grade_ensignement')
        if grade_ensignement:
            queryset = queryset.filter(grade_ensignement=grade_ensignement)

        # Filter by établissement
        etablissement = self.request.GET.get('etablissement')
        if etablissement == 'Autre':
            # Exclude specific etablissements
            queryset = queryset.exclude(etablissement__in=['Esi', 'esi','USTHB','usthb'])
        else:
            queryset = queryset.filter(etablissement=etablissement)

        # Filter by diplome
        diplome = self.request.GET.get('diplome')
        if diplome:
            queryset = queryset.filter(diplome=diplome)

        # Filter by sexe
        sexe = self.request.GET.get('sexe')
        if sexe:
            queryset = queryset.filter(sexe=sexe)

        queryset = queryset.distinct()
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        if len(serializer.data) == 0:
            # If queryset is empty, return an empty response with status 204 (No Content)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            # If queryset is not empty, return the serialized data with status 200 (OK)
            return Response(serializer.data, status=status.HTTP_200_OK)
        

        
#recherche des chercheurs generale :
class ChercheurSearchGAPIView(generics.ListAPIView):
    serializer_class =  ChercheurSearchSerializer
    #permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Chercheur.objects.all()

        search_query = self.request.query_params.get('q')
        if search_query:
            queryset = queryset.filter(
                Q(nom_chercheur__icontains=search_query) |
                Q(prenom_chercheur__icontains=search_query) |
                Q(etablissement__icontains=search_query) |
                Q(diplome__icontains=search_query) |
                Q(email__icontains=search_query) |
                Q(tel__icontains=search_query) |
                Q(dblp_lien__icontains=search_query) |
                Q(research_gate_lien__icontains=search_query) |
                Q(google_scholar_lien__icontains=search_query) |
                Q(site_web__icontains=search_query) |
                Q(grade_ensignement__icontains=search_query) |
                Q(grade_recherche__icontains=search_query) |
                Q(Qualite__icontains=search_query) |
                Q(h_index__icontains=search_query) |
                Q(sexe__icontains=search_query) |
                Q(equipe__icontains=search_query) |
                Q(statut__icontains=search_query) |
                Q(encadrements__intitule__icontains=search_query) |
                Q(encadrements__type_encadrement__icontains=search_query) |
                Q(encadrements__role_chercheur__icontains=search_query) |
                Q(encadrements__role_chercheur2__icontains=search_query) |
                Q(encadrements__nom_prenom_etd1__icontains=search_query) |
                Q(encadrements__nom_prenom_etd2__icontains=search_query) |
                Q(projet__titre_projet__icontains=search_query) |
                Q(projet__chef_de_projet__icontains=search_query) |
                Q(conf_journals__nom__icontains=search_query) |
                Q(conf_journals__acronyme__icontains=search_query) |
                Q(conf_journals__p_type__icontains=search_query) |
                Q(conf_journals__lien__icontains=search_query) |
                Q(conf_journals__core_classification__icontains=search_query) |
                Q(conf_journals__scimago_classification__icontains=search_query) |
                Q(conf_journals__qualis_classification__icontains=search_query) |
                Q(conf_journals__dgrsdt_classification__icontains=search_query) |
                Q(publication__titre_publication__icontains=search_query) |
                Q(publication__citations__icontains=search_query) |
                Q(publication__lien_publie__icontains=search_query) |
                Q(publication__rang_chercheur__icontains=search_query)

            )
        queryset = queryset.distinct()
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        if len(serializer.data) == 0:
            # If queryset is empty, return an empty response with status 204 (No Content)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            # If queryset is not empty, return the serialized data with status 200 (OK)
            return Response(serializer.data, status=status.HTTP_200_OK)
#publication par filtre :
class PublicationSearchAPIView(generics.ListAPIView):
    serializer_class = PublicationSearchSerializer
   # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Publication.objects.all()

        # Filtrer par type
        p_type = self.request.GET.get('p_type')
        if p_type:
            queryset = queryset.filter(Conf_Journal_id__p_type=p_type)

        # Filtrer par acronyme
        acronyme = self.request.GET.get('acronyme')
        if acronyme:
            queryset = queryset.filter(Conf_Journal_id__acronyme=acronyme)

        # Filtrer par année
        annee = self.request.GET.get('annee')
        if annee:
            queryset = queryset.filter(annee=annee)

        # Filtrer par mot-clé
        mot_cle = self.request.GET.get('mot_cle')
        if mot_cle:
            queryset = queryset.filter(titre_publication__icontains=mot_cle)



        return queryset


    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        if len(serializer.data) == 0:
            # If queryset is empty, return an empty response with status 204 (No Content)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            # If queryset is not empty, return the serialized data with status 200 (OK)
            return Response(serializer.data, status=status.HTTP_200_OK)

#publication generale : class PublicationSearchAPIView(generics.ListAPIView):
class PublicationSearchGAPIView(generics.ListAPIView):
    serializer_class = PublicationSearchSerializer
    #permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Publication.objects.all()

        search_query = self.request.query_params.get('q')
        if search_query:
            queryset = queryset.filter(
                Q(titre_publication__icontains=search_query) |
                Q(volume__icontains=search_query) |
                Q(citations__icontains=search_query) |
                Q(lien_publie__icontains=search_query) |
                Q(nombre_page__icontains=search_query) |
                Q(rang_chercheur__icontains=search_query) |
                Q(id_chercheur__nom_chercheur__icontains=search_query) |     # Recherche par nom de chercheur
                Q(id_chercheur__prenom_chercheur__icontains=search_query) |  # Recherche par prénom de chercheur
                Q(Conf_Journal_id__acronyme__icontains=search_query) |        # Recherche par acronyme de conférence
                Q(Conf_Journal_id__nom__icontains=search_query) |             # Recherche par nom de conférence
                Q(Conf_Journal_id__p_type__icontains=search_query) |         # Recherche par type de conférence
                Q(Conf_Journal_id__periodicite__icontains=search_query) |    # Recherche par périodicité de conférence
                Q(Conf_Journal_id__lien__icontains=search_query) |           # Recherche par lien de conférence
                Q(Conf_Journal_id__core_classification__icontains=search_query) |  # Recherche par classification CORE
                Q(Conf_Journal_id__scimago_classification__icontains=search_query) |  # Recherche par classification Scimago
                Q(Conf_Journal_id__qualis_classification__icontains=search_query) |   # Recherche par classification Qualis
                Q(Conf_Journal_id__dgrsdt_classification__icontains=search_query)     # Recherche par classification DGRSDT
                # Inclure d'autres champs si nécessaire
            )



        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        if len(serializer.data) == 0:
            # If queryset is empty, return an empty response with status 204 (No Content)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            # If queryset is not empty, return the serialized data with status 200 (OK)
            return Response(serializer.data, status=status.HTTP_200_OK)


#recherche des encadremnnt par filtre :
class EncadrementSearchAPIView(generics.ListAPIView):
    serializer_class = EncadrementSearchSerializer
    #permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Encadrement.objects.all()

        # Filtrer par date de début
        date_debut = self.request.GET.get('date_debut')
        if date_debut:
            queryset = queryset.filter(annee_debut=date_debut)

        # Filtrer par date de fin
        date_fin = self.request.GET.get('date_fin')
        if date_fin:
            queryset = queryset.filter(annee_fin=date_fin)

        # Filtrer par type
        type_encadrement = self.request.GET.get('type_encadrement')
        if type_encadrement:
            if type_encadrement == 'Autre':
                # Exclure certains types
                queryset = queryset.exclude(type_encadrement__in=['PFE', 'Master', 'Doctorat'])
            else:
                queryset = queryset.filter(type_encadrement=type_encadrement)

        # Filtrer par mot-clé
        mot_cle = self.request.GET.get('mot_cle')
        if mot_cle:
            queryset = queryset.filter(intitule__icontains=mot_cle)

        queryset = queryset.distinct()

        return queryset
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        if len(serializer.data) == 0:
            # If queryset is empty, return an empty response with status 204 (No Content)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            # If queryset is not empty, return the serialized data with status 200 (OK)
            return Response(serializer.data, status=status.HTTP_200_OK)
        

# recherche des encadremnnt generale :
class EncadrementSearchGAPIView(generics.ListAPIView):
    serializer_class = EncadrementSearchSerializer
   # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Encadrement.objects.all()

        search_query = self.request.query_params.get('q')
        if search_query:
            queryset = queryset.filter(
                Q(type_encadrement__icontains=search_query) |
                Q(intitule__icontains=search_query) |
                Q(role_chercheur__icontains=search_query) |
                Q(nom_prenom_etd1__icontains=search_query) |
                Q(nom_prenom_etd2__icontains=search_query) |
                Q(annee_debut__icontains=search_query) |
                Q(annee_fin__icontains=search_query) |
                Q(role_chercheur2__icontains=search_query) |
                Q(chercheur__nom_chercheur__icontains=search_query)
            )

        queryset = queryset.distinct()

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        if len(serializer.data) == 0:
            # If queryset is empty, return an empty response with status 204 (No Content)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            # If queryset is not empty, return the serialized data with status 200 (OK)
            return Response(serializer.data, status=status.HTTP_200_OK)
#recherche filtre projets :
class ProjetSearchAPIView(generics.ListAPIView):
    serializer_class = ProjetSearchSerializer
    #permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Récupérer tous les projets
        queryset = Projet.objects.all()

        # Filtrer par date de début si le paramètre 'date_debut' est présent dans la requête
        date_debut = self.request.GET.get('date_debut')
        if date_debut:
            queryset = queryset.filter(annee_debut=date_debut)

        # Filtrer par date de fin si le paramètre 'date_fin' est présent dans la requête
        date_fin = self.request.GET.get('date_fin')
        if date_fin:
            queryset = queryset.filter(annee_fin=date_fin)

        # Filtrer par domaine si le paramètre 'domaine' est présent dans la requête
        domaine = self.request.GET.get('domaine')
        if domaine:
            queryset = queryset.filter(domaine=domaine)

        # Filtrer par mot-clé si le paramètre 'mot_cle' est présent dans la requête
        mot_cle = self.request.GET.get('mot_cle')
        if mot_cle:
            # Filtrer les projets dont le titre contient le mot-clé
            queryset = queryset.filter(titre_projet__icontains=mot_cle)

        queryset = queryset.distinct()

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        if len(serializer.data) == 0:
            # If queryset is empty, return an empty response with status 204 (No Content)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            # If queryset is not empty, return the serialized data with status 200 (OK)
            return Response(serializer.data, status=status.HTTP_200_OK)

#recherche generale projets :
class ProjetSearchGAPIView(generics.ListAPIView):
    serializer_class = ProjetSearchSerializer
    #permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Projet.objects.all()

        search_query = self.request.query_params.get('q')
        if search_query:
            queryset = queryset.filter(
                Q(titre_projet__icontains=search_query) |
                Q(chef_de_projet__icontains=search_query) |
                Q(domaine__icontains=search_query) |
                Q(annee_debut__icontains=search_query) |
                Q(chercheur__nom_chercheur__icontains=search_query)|
                Q(annee_fin__icontains=search_query) |
                Q(chercheur__nom_chercheur__icontains=search_query)
            )

        queryset = queryset.distinct()

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        if len(serializer.data) == 0:
            # If queryset is empty, return an empty response with status 204 (No Content)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            # If queryset is not empty, return the serialized data with status 200 (OK)
            return Response(serializer.data, status=status.HTTP_200_OK)

class PublicationDetailView(generics.RetrieveAPIView):
    queryset = Publication.objects.all()
    serializer_class = PublicationDetailSerializer



##########################################################CHERCHEUR_PLUS_CITé############################################################################""







class ChercheursPlusCite(APIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = ChercheurProfileSerializer

    def get(self, request):
        # Récupérer l'année actuelle
        current_year = datetime.datetime.now().year

        # Obtenir le nombre maximal de citations pour l'année actuelle
        max_citations = Publication.objects.filter(annee=current_year).aggregate(Max('citations'))['citations__max']

        # Vérifier si des publications ont été trouvées pour l'année actuelle
        if max_citations:
            # Filtrer les publications de l'année actuelle avec le nombre maximal de citations
            publications = Publication.objects.filter(annee=current_year, citations=max_citations)

            # Récupérer le titre de la première publication (la plus citée)
            titre_publication = publications.first().titre_publication

            # Récupérer tous les chercheurs associés à cette publication
            chercheurs_associés = Chercheur.objects.filter(publication__titre_publication=titre_publication)

            # Sérialiser les chercheurs associés avec tous leurs attributs
            chercheurs_serializer = self.serializer_class(chercheurs_associés, many=True)

            # Extraire les IDs des chercheurs associés
            ids_chercheurs = list(chercheurs_associés.values_list('id_chercheur', flat=True))

            return Response({
                'chercheurs': chercheurs_serializer.data,
                'ids_chercheurs': ids_chercheurs
            })
        else:
            return Response({'message': 'Aucune publication trouvée pour l\'année actuelle'}, status=status.HTTP_404_NOT_FOUND)


#fonction qui return le chercheur le plus cite selon h_index
class ChercheurPlusCite(APIView):
    ##permission_classes = [IsAuthenticated]
    serializer_class = ChercheurProfileSerializer

    def get(self, request):
        chercheur_plus_cite = Chercheur.objects.order_by('-h_index').first()

        if chercheur_plus_cite:
            chercheur_serializer = self.serializer_class(chercheur_plus_cite)
            return Response(chercheur_serializer.data)
        else:
            return Response({'message': 'Aucun chercheur trouvé'}, status=status.HTTP_404_NOT_FOUND)

class ChercheurprofileAPIView(RetrieveAPIView):
   # permission_classes = [IsAuthenticated]
    queryset = Chercheur.objects.all()
    serializer_class = ChercheurProfileSerializer
    lookup_field = 'id_chercheur'  # Champ à utiliser pour rechercher l'objet Chercheur
class PublicationprofileAPIView(RetrieveAPIView):
    #permission_classes = [IsAuthenticated]
    queryset = Publication.objects.all()
    serializer_class = PublicationCiteSerializer
    lookup_field = 'id'



class Publicationprofil2eAPIView(RetrieveAPIView):
    #permission_classes = [IsAuthenticated]
    queryset = Publication.objects.all()
    serializer_class = PublicationCiteSerializer2
    lookup_field = 'id'

#fonction pour chercher la pub la plus cite 
class PublicationPlusCite(APIView):
   
    serializer_class = PublicationCiteSerializer

    def get(self, request):
        # Récupérer l'année actuelle
        current_year = datetime.datetime.now().year

        # Obtenir le nombre maximal de citations pour l'année actuelle
        max_citations = Publication.objects.filter(annee=current_year).aggregate(Max('citations'))['citations__max']

        # Vérifier si des publications ont été trouvées pour l'année actuelle
        if max_citations:
            # Filtrer les publications de l'année actuelle avec le nombre maximal de citations
            publications = Publication.objects.filter(annee=current_year, citations=max_citations)

            # Récupérer le titre de la première publication (la plus citée)
            titre_publication = publications.first().titre_publication

            # Récupérer tous les chercheurs associés à cette publication
            chercheurs_associés = Chercheur.objects.filter(publication__titre_publication=titre_publication)

            # Sérialiser les chercheurs associés avec leurs IDs
            chercheurs_serializer = ChercheurNameSerializer(chercheurs_associés, many=True)

            # Récupérer les IDs des chercheurs
            chercheurs_ids = chercheurs_associés.values_list('id_chercheur', flat=True)

            # Sérialiser la première publication avec les IDs des chercheurs associés
            publication_max_citations_serializer = PublicationCiteSerializer(publications.first())
            publication_data = publication_max_citations_serializer.data
            publication_data['chercheurs'] = chercheurs_serializer.data
            publication_data['chercheurs_ids'] = list(chercheurs_ids)

            return Response(publication_data)
        else:
            return Response({'message': 'Aucune publication trouvée pour l\'année actuelle'}, status=status.HTTP_404_NOT_FOUND)


class ChercheurListAPIView(generics.ListAPIView):
    serializer_class = ChercheurSearchSerializer
    queryset = Chercheur.objects.all()

class PublicationssListAPIView(generics.ListAPIView):
    serializer_class = PublicationSearchSerializer
    queryset = Publication.objects.all()

class EncadrementDetailsAPIView(RetrieveAPIView):
    queryset = Encadrement.objects.all()
    serializer_class = EncadrementSerializer
    lookup_field = 'id_encadrement'

class EncadrementssListAPIView(generics.ListAPIView):
    queryset = Encadrement.objects.all()
    serializer_class = EncadrementSearchSerializer
class ProjetsListAPIView(generics.ListAPIView):
    queryset = Projet.objects.all()
    serializer_class = ProjetSearchSerializer



class ProjetDetailsAPIView(RetrieveAPIView):
    queryset = Projet.objects.all()
    serializer_class = ProjetSerializer
    lookup_field = 'id_projet'





class ChercheurInfoAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        chercheur_id = None
        if request.user.is_authenticated:
            chercheur = request.user.chercheur
            if chercheur:
                chercheur_id = chercheur.id_chercheur

        if chercheur_id:
            try:
                chercheur = Chercheur.objects.get(id_chercheur=chercheur_id)
                serializer = ChercheurDetailSerializer(chercheur)
                return Response(serializer.data)
            except Chercheur.DoesNotExist:
                return Response({"message": "Chercheur not found."}, status=404)
        else:
            return Response({"message": "User is not a chercheur."}, status=403)
        
# khadidja:
class InitAPIView(APIView):
    @csrf_exempt
    def post(self, request):
        init_publications_from_excel_to_excel(settings.AUTHORS_LIST_EXCEL_FILE, settings.INIT_PUBLICATIONS)
        venues_from_excel_to_excel(settings.INIT_PUBLICATIONS, settings.VENUES)
        init_authors_from_excel_to_excel(settings.AUTHORS_LIST_EXCEL_FILE, settings.AUTHORS, settings.INIT_PUBLICATIONS)
        return Response({'status': 'success'}, status=status.HTTP_200_OK)

class MajAPIView(APIView):
    @csrf_exempt
    def post(self, request):
        mise_a_jour_publications_from_excel_to_excel(settings.AUTHORS_LIST_EXCEL_FILE,settings.INIT_PUBLICATIONS, settings.MAJ_PUBLICATIONS)
        return Response({'status': 'success'}, status=status.HTTP_200_OK)

class DownloadFileAPIView(APIView):
    def get(self, request):
        file_name = request.query_params.get('file_name', '')
        if file_name:
            if file_name == 'init_publications':
                file_path = os.path.join(settings.BASE_DIR, settings.INIT_PUBLICATIONS_EXCEL_FILE)
            elif file_name == 'venues':
                file_path = os.path.join(settings.BASE_DIR, settings.VENUES_EXCEL_FILE)
            elif file_name == 'authors':
                file_path = os.path.join(settings.BASE_DIR, settings.AUTHORS_EXCEL_FILE)
            elif file_name =='projets':
                file_path = os.path.join(settings.BASE_DIR, settings.PROJETS_EXCEL_FILE)
            else:
                raise Http404("File not found")

            if os.path.exists(file_path):
                with open(file_path, 'rb') as fh:
                    response = HttpResponse(fh.read(), content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                    # response['Content-Disposition'] = f'attachment; filename="{os.path.basename(file_path)}"'
                    response['Content-Disposition'] = f'attachment; filename="{file_name}"'
                    return response
            else: 
                print("File not found")
                print(file_path)
                raise Http404("File not found")
        else:
            raise Http404("File name parameter is missing")
        



@api_view(['GET'])
def publications_stats(request):
    # Initialize a dictionary to hold the count for each year
    publications_per_year = {}

    # Loop through each year from 2012 to 2024
    for year in range(2012, 2025):
        # Calculate the count of publications for the current year
        publications_count = Publication.objects.filter(
            annee=year
        ).count()
        # Add the count to the dictionary
        publications_per_year[year] = publications_count

    return Response(publications_per_year)




@api_view(['GET'])
def chercheur_dashboard(request):
    if request.user.is_authenticated:
        chercheur = request.user.chercheur
        if chercheur:
            # Get the number of publications
            publications_count = Publication.objects.filter(id_chercheur=chercheur).count()

            # Get the number of projects
            projects_count = chercheur.projet.count()

            # Get the number of supervisions
            encadrement_count = chercheur.encadrements.count()

            context = {
                'publications_count': publications_count,
                'projects_count': projects_count,
                'encadrement_count': encadrement_count,
            }

            return JsonResponse(context)
    return JsonResponse({"error": "Unauthorized"}, status=401)




@csrf_exempt
def initialize_database(request):
    if request.method == 'POST':
        try:
            # Constructing the path to the SQL script
            sql_file_path = settings.SCRIPT

            # Opening and executing the SQL script
            with open(sql_file_path, 'r', encoding='utf-8', errors='replace') as file:  # Specify encoding and handle errors
                sql_statements = file.read().split(';')
                cursor = connection.cursor()
                for sql_statement in sql_statements:
                    sql_statement = sql_statement.strip()
                    if sql_statement:
                        print(f"Executing SQL statement: {sql_statement}")
                        cursor.execute(sql_statement)

            return JsonResponse({'status': 'success'})
        except Exception as e:
            traceback.print_exc()
            error_message = str(e)
            print(f"Error initializing database: {error_message}")
            return JsonResponse({'status': 'error', 'message': error_message})






@csrf_exempt
@api_view(['GET', 'POST'])
def chercheur_dashboardAutre(request, id_chercheur):
    chercheur = get_object_or_404(Chercheur, pk=id_chercheur)

    if request.method == 'GET':
        # Get the number of publications
        publications_count = Publication.objects.filter(id_chercheur=chercheur).count()

        # Get the number of projects
        projects_count = chercheur.projet.count()

        # Get the number of supervisions
        encadrement_count = chercheur.encadrements.count()

        context = {
            'publications_count': publications_count,
            'projects_count': projects_count,
            'encadrement_count': encadrement_count,
        }

        return JsonResponse(context)
    elif request.method == 'POST':
        # Get the number of publications
        publications_count = Publication.objects.filter(id_chercheur=chercheur).count()

        # Get the number of projects
        projects_count = chercheur.projet.count()

        # Get the number of supervisions
        encadrement_count = chercheur.encadrements.count()

        context = {
            'publications_count': publications_count,
            'projects_count': projects_count,
            'encadrement_count': encadrement_count,
        }

        return JsonResponse(context)