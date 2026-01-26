from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import *

# Configuration de l'interface d'administration pour le modèle User
@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'role', 'is_staff')
    list_filter = ('role', 'is_staff', 'is_superuser', 'is_active')
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Informations personnelles'), {'fields': ('first_name', 'last_name', 'email')}),
        (_('Rôle et permissions'), {
            'fields': ('role', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        (_('Dates importantes'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'role'),
        }),
    )
    search_fields = ('username', 'first_name', 'last_name', 'email')
    ordering = ('username',)

# Configuration pour le modèle Filiere
@admin.register(Filiere)
class FiliereAdmin(admin.ModelAdmin):
    list_display = ('code', 'intitule', 'responsable', 'est_active')
    list_filter = ('est_active',)
    search_fields = ('code', 'intitule', 'description')
    raw_id_fields = ('responsable',)

# Configuration pour le modèle Niveau
@admin.register(Niveau)
class NiveauAdmin(admin.ModelAdmin):
    list_display = ('code', 'intitule', 'ordre', 'est_actif')
    list_filter = ('est_actif',)
    ordering = ('ordre',)

# Configuration pour le modèle Etudiant
class EtudiantAdmin(admin.ModelAdmin):
    list_display = ('matricule', 'nom_complet', 'filiere', 'niveau', 'statut')
    list_filter = ('filiere', 'niveau', 'statut', 'genre')
    search_fields = ('matricule', 'nom', 'prenom', 'email')
    list_select_related = ('filiere', 'niveau')
    date_hierarchy = 'date_inscription'
    
    def nom_complet(self, obj):
        return f"{obj.prenom} {obj.nom}"
    nom_complet.short_description = 'Nom complet'

# Configuration pour le modèle Matiere
class MatiereAdmin(admin.ModelAdmin):
    list_display = ('code', 'intitule', 'filiere', 'niveau', 'enseignant', 'coefficient', 'est_active')
    list_filter = ('filiere', 'niveau', 'est_active')
    search_fields = ('code', 'intitule', 'description')
    raw_id_fields = ('enseignant',)

# Configuration pour le modèle Note
class NoteAdmin(admin.ModelAdmin):
    list_display = ('etudiant', 'matiere', 'valeur', 'type_evaluation', 'date_evaluation')
    list_filter = ('type_evaluation', 'matiere__filiere', 'matiere__niveau')
    search_fields = ('etudiant__nom', 'etudiant__prenom', 'matiere__intitule')
    date_hierarchy = 'date_evaluation'
    raw_id_fields = ('etudiant', 'matiere')

# Configuration pour le modèle PaiementEcolage
class PaiementEcolageAdmin(admin.ModelAdmin):
    list_display = ('etudiant', 'montant', 'date_paiement', 'date_echeance', 'statut', 'mois_couvert', 'annee_couverte')
    list_filter = ('statut', 'mois_couvert', 'annee_couverte')
    search_fields = ('etudiant__nom', 'etudiant__prenom', 'reference')
    date_hierarchy = 'date_paiement'
    raw_id_fields = ('etudiant', 'cree_par')

# Configuration pour le modèle PresenceCours
class PresenceCoursAdmin(admin.ModelAdmin):
    list_display = ('etudiant', 'matiere', 'date_cours', 'statut', 'heure_debut', 'heure_fin')
    list_filter = ('statut', 'matiere__filiere', 'matiere__niveau')
    search_fields = ('etudiant__nom', 'etudiant__prenom', 'matiere__intitule')
    date_hierarchy = 'date_cours'
    raw_id_fields = ('etudiant', 'matiere', 'cree_par')

# Configuration pour le modèle EmploiDuTemps
class EmploiDuTempsAdmin(admin.ModelAdmin):
    list_display = ('filiere', 'niveau', 'matiere', 'jour', 'heure_debut', 'heure_fin', 'salle', 'est_actif')
    list_filter = ('jour', 'filiere', 'niveau', 'est_actif')
    search_fields = ('matiere__intitule', 'enseignant__username', 'salle')
    raw_id_fields = ('matiere', 'enseignant', 'cree_par')

# Enregistrement des modèles
admin.site.register(Etudiant, EtudiantAdmin)
admin.site.register(Matiere, MatiereAdmin)
admin.site.register(Note, NoteAdmin)
admin.site.register(PaiementEcolage, PaiementEcolageAdmin)
admin.site.register(PresenceCours, PresenceCoursAdmin)
admin.site.register(EmploiDuTemps, EmploiDuTempsAdmin)
