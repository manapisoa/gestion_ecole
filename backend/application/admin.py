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
    list_display = ('reference', 'etudiant_info', 'montant', 'date_paiement', 'date_echeance', 'statut', 'secretaire_info', 'periode_scolaire')
    list_filter = ('statut', 'mois_couvert', 'annee_couverte', 'mode_paiement', 'secretaire')
    search_fields = ('etudiant__nom', 'etudiant__prenom', 'reference', 'commentaire', 'secretaire__username')
    date_hierarchy = 'date_paiement'
    list_per_page = 20
    raw_id_fields = ('etudiant', 'cree_par', 'secretaire')
    readonly_fields = ('date_creation', 'secretaire_info')
    fieldsets = (
        (_('Informations de base'), {
            'fields': ('etudiant', 'reference', 'montant', 'statut')
        }),
        (_('Détails du paiement'), {
            'fields': ('date_paiement', 'date_echeance', 'mode_paiement', 'mois_couvert', 'annee_couverte')
        }),
        (_('Responsables'), {
            'fields': ('cree_par', 'secretaire')
        }),
        (_('Informations supplémentaires'), {
            'classes': ('collapse',),
            'fields': ('commentaire', 'date_creation')
        }),
    )
    
    def etudiant_info(self, obj):
        return f"{obj.etudiant.nom} {obj.etudiant.prenom} ({obj.etudiant.filiere} - {obj.etudiant.niveau})"
    etudiant_info.short_description = 'Étudiant'
    etudiant_info.admin_order_field = 'etudiant__nom'
    
    def periode_scolaire(self, obj):
        mois_fr = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ]
        return f"{mois_fr[obj.mois_couvert - 1]} {obj.annee_couverte}"
    periode_scolaire.short_description = 'Période'
    
    def secretaire_info(self, obj):
        if obj.secretaire:
            return f"{obj.secretaire.get_full_name() or obj.secretaire.username} ({obj.secretaire.get_role_display()})"
        return "-"
    secretaire_info.short_description = 'Enregistré par'
    
    def save_model(self, request, obj, form, change):
        if not obj.pk:  # Si c'est une nouvelle entrée
            obj.cree_par = request.user
            if not obj.secretaire and hasattr(request.user, 'role') and request.user.role in [User.Role.ADMIN, User.Role.SECRETARIAT]:
                obj.secretaire = request.user
        super().save_model(request, obj, form, change)

# Configuration pour le modèle PresenceCours
class PresenceCoursAdmin(admin.ModelAdmin):
    list_display = ('etudiant', 'matiere', 'date_cours', 'statut', 'heure_debut', 'heure_fin')
    list_filter = ('statut', 'matiere__filiere', 'matiere__niveau')
    search_fields = ('etudiant__nom', 'etudiant__prenom', 'matiere__intitule')
    date_hierarchy = 'date_cours'
    raw_id_fields = ('etudiant', 'matiere', 'cree_par')

# Configuration pour le modèle EmploiDuTemps
class EmploiDuTempsAdmin(admin.ModelAdmin):
    list_display = ('filiere_niveau', 'matiere_enseignant', 'jour_et_creneau', 'salle', 'statut_edt')
    list_filter = ('jour', 'filiere', 'niveau', 'est_actif', 'enseignant')
    search_fields = ('matiere__intitule', 'enseignant__username', 'salle', 'filiere__intitule', 'niveau__intitule')
    list_per_page = 20
    raw_id_fields = ('matiere', 'enseignant', 'cree_par')
    readonly_fields = ('date_creation', 'duree_cours')
    date_hierarchy = 'date_debut'
    
    fieldsets = (
        (_('Informations générales'), {
            'fields': ('filiere', 'niveau', 'matiere', 'enseignant')
        }),
        (_('Horaire'), {
            'fields': ('jour', 'heure_debut', 'heure_fin', 'duree_cours', 'salle')
        }),
        (_('Période de validité'), {
            'fields': ('date_debut', 'date_fin')
        }),
        (_('Statut et création'), {
            'fields': ('est_actif', 'cree_par', 'date_creation')
        }),
    )
    
    def filiere_niveau(self, obj):
        return f"{obj.filiere} - {obj.niveau}"
    filiere_niveau.short_description = 'Filière / Niveau'
    filiere_niveau.admin_order_field = 'filiere__code'
    
    def matiere_enseignant(self, obj):
        return f"{obj.matiere} - {obj.enseignant}"
    matiere_enseignant.short_description = 'Matière / Enseignant'
    
    def jour_et_creneau(self, obj):
        return f"{obj.get_jour_display()} {obj.heure_debut.strftime('%H:%M')}-{obj.heure_fin.strftime('%H:%M')}"
    jour_et_creneau.short_description = 'Créneau horaire'
    jour_et_creneau.admin_order_field = 'heure_debut'
    
    def statut_edt(self, obj):
        from django.utils.html import format_html
        from django.utils import timezone
        
        if not hasattr(obj, 'est_actif') or not obj.est_actif:
            return format_html('<span style="color: #999;">{}</span>', 'Inactif')
            
        now = timezone.now().date()
        
        if not hasattr(obj, 'date_debut') or obj.date_debut is None:
            return format_html('<span style="color: #999;">{}</span>', 'Non défini')
            
        if hasattr(obj, 'date_fin') and obj.date_fin is not None and obj.date_fin < now:
            return format_html('<span style="color: #f39c12;">{}</span>', 'Terminé')
        elif obj.date_debut > now:
            return format_html('<span style="color: #3498db;">{}</span>', 'À venir')
        else:
            return format_html('<span style="color: #2ecc71;">{}</span>', 'En cours')
    statut_edt.short_description = 'Statut'
    
    def duree_cours(self, obj):
        return f"{obj.duree()} heures"
    duree_cours.short_description = 'Durée'

# Enregistrement des modèles
admin.site.register(Etudiant, EtudiantAdmin)
admin.site.register(Matiere, MatiereAdmin)
admin.site.register(Note, NoteAdmin)
admin.site.register(PaiementEcolage, PaiementEcolageAdmin)
admin.site.register(PresenceCours, PresenceCoursAdmin)
admin.site.register(EmploiDuTemps, EmploiDuTempsAdmin)
