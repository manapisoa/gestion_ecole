from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils import timezone
import uuid

class UserManager(BaseUserManager):
    """Gestionnaire personnalisé pour le modèle User."""
    
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email est obligatoire')
            
        email = self.normalize_email(email)
        role = extra_fields.get('role', 'ETUDIANT')  # Use string literal as default
        
        # Désactiver la connexion pour les étudiants
        if role == 'ETUDIANT':
            extra_fields.setdefault('is_active', False)
        
        user = self.model(email=email, **extra_fields)
        user.role = role  # Set the role after creating the user
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        # S'assurer que les superutilisateurs sont actifs
        extra_fields.setdefault('is_active', True)
        # S'assurer qu'un superutilisateur est un administrateur
class User(AbstractUser):
    """Modèle utilisateur personnalisé."""
    
    # Redéfinition du champ username pour le rendre non obligatoire
    username = models.CharField(
        _('nom d\'utilisateur'),
        max_length=150,
        blank=True,
        null=True,
        unique=True,
        default=uuid.uuid4,  # Valeur par défaut unique
        help_text=_('Généré automatiquement si non fourni')
    )
    
    def save(self, *args, **kwargs):
        if not self.username:
            self.username = str(uuid.uuid4())
        super().save(*args, **kwargs)
    
    # Définition des rôles possibles
    class Role(models.TextChoices):
        ADMIN = 'ADMIN', _('Administrateur')
        ENSEIGNANT = 'ENSEIGNANT', _('Enseignant')
        ETUDIANT = 'ETUDIANT', _('Étudiant')
        RESPONSABLE = 'RESPONSABLE', _('responsable Pédagogique')
        SECRETARIAT = 'SECRETARIAT', _('Secrétariat')
    
    # Définition des genres possibles
    class Genre(models.TextChoices):
        HOMME = 'H', _('Homme')
        FEMME = 'F', _('Femme')
        AUTRE = 'A', _('Autre')
    
    # Champs personnalisés
    role = models.CharField(
        _('rôle'),
        max_length=15,
        choices=Role.choices,
        default=Role.ETUDIANT
    )
    
    genre = models.CharField(
        _('genre'),
        max_length=1,
        choices=Genre.choices,
        blank=True,
        null=True
    )
    
    # Champs hérités de AbstractUser avec des personnalisations
    email = models.EmailField(_('adresse email'), unique=True)
    first_name = models.CharField(_('prénom'), max_length=150)
    last_name = models.CharField(_('nom'), max_length=150)
    is_active = models.BooleanField(
        _('compte actif'),
        default=False,
        help_text=_('Détermine si l\'utilisateur peut se connecter. Les étudiants ne peuvent pas se connecter.')
    )
    
    # Configuration pour utiliser l'email comme identifiant
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'role']
    
    # Gestion des groupes et permissions
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name=_('groupes'),
        blank=True,
        help_text=_('Les groupes auxquels appartient l\'utilisateur.'),
        related_name='application_user_set',
        related_query_name='application_user',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name=_('permissions utilisateur'),
        blank=True,
        help_text=_('Permissions spécifiques pour cet utilisateur.'),
        related_name='application_user_set',
        related_query_name='application_user',
    )
    
    # Champs personnalisés
    role = models.CharField(
        _('rôle'),
        max_length=15,
        choices=Role.choices,
        default=Role.ENSEIGNANT
    )
    is_active = models.BooleanField(
        _('compte actif'),
        default=False,
        help_text=_('Détermine si l\'utilisateur peut se connecter. Les étudiants ne peuvent pas se connecter.')
    )
    genre = models.CharField(
        _('genre'),
        max_length=1,
        choices=Genre.choices,
        blank=True,
        null=True
    )
    telephone = models.CharField(
        _('téléphone'),
        max_length=20,
        validators=[
            RegexValidator(
                regex=r'^\+?[0-9]{10,15}$',
                message=_('Format de téléphone invalide. Ex: +261340000000 ou 0340000000')
            )
        ],
        blank=True,
        null=True
    )
    photo = models.ImageField(
        _('photo de profil'),
        upload_to='photos_profils/',
        blank=True,
        null=True
    )
    date_naissance = models.DateField(
        _('date de naissance'),
        null=True,
        blank=True
    )
    lieu_naissance = models.CharField(
        _('lieu de naissance'),
        max_length=100,
        blank=True,
        null=True
    )
    adresse = models.TextField(
        _('adresse'),
        blank=True,
        null=True
    )
    date_creation = models.DateTimeField(
        _('date de création'),
        auto_now_add=True
    )
    date_modification = models.DateTimeField(
        _('date de modification'),
        auto_now=True
    )
    
    objects = UserManager()
    
    class Meta:
        verbose_name = _('utilisateur')
        verbose_name_plural = _('utilisateurs')
        ordering = ['last_name', 'first_name']
    
    def __str__(self):
        return self.get_full_name() or self.email

class Filiere(models.Model):
    """Modèle représentant une filière de formation."""
    code = models.CharField(
        _('code'),
        max_length=10,
        unique=True,
        help_text=_('Code court de la filière (ex: INFO, GESTION)')
    )
    intitule = models.CharField(
        _('intitulé'),
        max_length=100
    )
    description = models.TextField(
        _('description'),
        blank=True,
        null=True
    )
    duree_etudes = models.PositiveSmallIntegerField(
        _('durée des études (années)'),
        default=3,
        validators=[MinValueValidator(1), MaxValueValidator(6)]
    )
    responsable = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        limit_choices_to={'role': User.Role.RESPONSABLE},
        related_name='filieres_dirigees',
        verbose_name=_('responsable pédagogique')
    )
    capacite_max = models.PositiveSmallIntegerField(
        _('capacité maximale'),
        default=50
    )
    est_active = models.BooleanField(
        _('est active'),
        default=True
    )
    
    class Meta:
        verbose_name = _('filière')
        verbose_name_plural = _('filières')
        ordering = ['code']
    
    def __str__(self):
        return f"{self.code} - {self.intitule}"

class Niveau(models.Model):
    """Modèle représentant un niveau d'étude."""
    code = models.CharField(
        _('code'),
        max_length=10,
        unique=True,
        help_text=_('Ex: L1, L2, M1, D1, etc.')
    )
    intitule = models.CharField(
        _('intitulé'),
        max_length=100
    )
    ordre = models.PositiveSmallIntegerField(
        _('ordre'),
        unique=True,
        help_text=_('Ordre d\'affichage (1 pour le premier niveau)')
    )
    est_actif = models.BooleanField(
        _('est actif'),
        default=True
    )
    
    class Meta:
        verbose_name = _('niveau')
        verbose_name_plural = _('niveaux')
        ordering = ['ordre']
    
    def __str__(self):
        return f"{self.code} - {self.intitule}"
class Etudiant(models.Model):
    """Modèle représentant un étudiant."""
    
    class StatutEtudiant(models.TextChoices):
        INSCRIT = 'INSCRIT', _('Inscrit')
        ADMIS = 'ADMIS', _('Admis')
        ABANDON = 'ABANDON', _('Abandon')
        EXCLU = 'EXCLU', _('Exclu')
        DIPLOME = 'DIPLOME', _('Diplômé')
    
    class Genre(models.TextChoices):
        HOMME = 'H', _('Homme')
        FEMME = 'F', _('Femme')
        AUTRE = 'A', _('Autre')

    # Informations personnelles
    matricule = models.CharField(
        _('matricule'),
        max_length=20,
        unique=True,
        help_text=_('Format: ANNEE-CODE-XXXX (ex: 2023-INF-0001)')
    )
    nom = models.CharField(_('nom'), max_length=100)
    prenom = models.CharField(_('prénom'), max_length=100)
    date_naissance = models.DateField(_('date de naissance'))
    lieu_naissance = models.CharField(_('lieu de naissance'), max_length=100)
    genre = models.CharField(
        _('genre'),
        max_length=1,
        choices=Genre.choices
    )
    nationalite = models.CharField(
        _('nationalité'),
        max_length=100,
        default='Malagasy'
    )
    
    # Informations de contact
    adresse = models.TextField(_('adresse'), blank=True, null=True)
    telephone = models.CharField(
        _('téléphone'),
        max_length=20,
        validators=[
            RegexValidator(
                regex=r'^\+?[0-9]{10,15}$',
                message=_('Format de téléphone invalide. Ex: +261340000000 ou 0340000000')
            )
        ],
        blank=True,
        null=True
    )
    email = models.EmailField(_('adresse email'), unique=True, blank=True, null=True)
    
    # Informations académiques
    date_inscription = models.DateField(_("date d'inscription"), auto_now_add=True)
    statut = models.CharField(
        _('statut'),
        max_length=10,
        choices=StatutEtudiant.choices,
        default=StatutEtudiant.INSCRIT
    )
    
    # Relations
    filiere = models.ForeignKey(
        Filiere,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name=_('filière'),
        related_name='etudiants'
    )
    
    niveau = models.ForeignKey(
        Niveau,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name=_('niveau'),
        related_name='etudiants'
    )
    
    # Champs de suivi
    date_creation = models.DateTimeField(auto_now_add=True)
    date_modification = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('étudiant')
        verbose_name_plural = _('étudiants')
        ordering = ['nom', 'prenom']
        unique_together = ['nom', 'prenom', 'date_naissance']

    def __str__(self):
        return f"{self.nom.upper()} {self.prenom} ({self.matricule})"

    @property
    def age(self):
        """Calcule l'âge de l'étudiant."""
        from datetime import date
        today = date.today()
        return today.year - self.date_naissance.year - (
            (today.month, today.day) < 
            (self.date_naissance.month, self.date_naissance.day)
        )

    def get_full_name(self):
        """Retourne le nom complet de l'étudiant."""
        return f"{self.prenom} {self.nom.upper()}"


class Matiere(models.Model):
    """Modèle représentant une matière d'enseignement."""
    
    code = models.CharField(
        _('code'),
        max_length=10,
        unique=True,
        help_text=_('Code court de la matière (ex: MATH, PHYS)')
    )
    intitule = models.CharField(
        _('intitulé'),
        max_length=100
    )
    description = models.TextField(
        _('description'),
        blank=True,
        null=True
    )
    coefficient = models.PositiveSmallIntegerField(
        _('coefficient'),
        default=1,
        validators=[MinValueValidator(1), MaxValueValidator(10)]
    )
    filiere = models.ForeignKey(
        Filiere,
        on_delete=models.CASCADE,
        verbose_name=_('filière'),
        related_name='matieres'
    )
    niveau = models.ForeignKey(
        Niveau,
        on_delete=models.CASCADE,
        verbose_name=_('niveau'),
        related_name='matieres'
    )
    enseignant = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        limit_choices_to={'role': User.Role.ENSEIGNANT},
        verbose_name=_('enseignant'),
        related_name='matieres_enseignees'
    )
    est_active = models.BooleanField(
        _('est active'),
        default=True
    )
    
    class Meta:
        verbose_name = _('matière')
        verbose_name_plural = _('matières')
        ordering = ['code']
        unique_together = ['code', 'filiere', 'niveau']
    
    def __str__(self):
        return f"{self.code} - {self.intitule} ({self.filiere.code} {self.niveau.code})"


class Note(models.Model):
    """Modèle représentant une note d'un étudiant dans une matière."""
    
    etudiant = models.ForeignKey(
        Etudiant,
        on_delete=models.CASCADE,
        verbose_name=_('étudiant'),
        related_name='notes'
    )
    matiere = models.ForeignKey(
        Matiere,
        on_delete=models.CASCADE,
        verbose_name=_('matière'),
        related_name='notes'
    )
    valeur = models.DecimalField(
        _('note'),
        max_digits=4,
        decimal_places=2,
        validators=[MinValueValidator(0), MaxValueValidator(20)]
    )
    date_evaluation = models.DateField(
        _("date d'évaluation"),
        default=timezone.now
    )
    type_evaluation = models.CharField(
        _("type d'évaluation"),
        max_length=50,
        help_text=_('Ex: Contrôle continu, Examen final, etc.')
    )
    commentaire = models.TextField(
        _('commentaire'),
        blank=True,
        null=True
    )
    date_creation = models.DateTimeField(
        _('date de création'),
        auto_now_add=True
    )
    date_modification = models.DateTimeField(
        _('date de modification'),
        auto_now=True
    )
    
    class Meta:
        verbose_name = _('note')
        verbose_name_plural = _('notes')
        ordering = ['-date_evaluation', 'etudiant']
        unique_together = ['etudiant', 'matiere', 'type_evaluation']
    
    def __str__(self):
        return f"{self.etudiant} - {self.matiere} - {self.valeur}/20"


class PaiementEcolage(models.Model):
    """Modèle représentant un paiement d'écolage."""
    
    class StatutPaiement(models.TextChoices):
        EN_ATTENTE = 'EN_ATTENTE', _('En attente')
        PAYE = 'PAYE', _('Payé')
        ANNULE = 'ANNULE', _('Annulé')
        EN_RETARD = 'EN_RETARD', _('En retard')
    
    etudiant = models.ForeignKey(
        Etudiant,
        on_delete=models.CASCADE,
        verbose_name=_('étudiant'),
        related_name='paiements_ecolage'
    )
    montant = models.DecimalField(
        _('montant'),
        max_digits=10,
        decimal_places=2
    )
    date_paiement = models.DateField(
        _('date de paiement'),
        default=timezone.now
    )
    date_echeance = models.DateField(
        _('date d\'échéance')
    )
    statut = models.CharField(
        _('statut'),
        max_length=15,
        choices=StatutPaiement.choices,
        default=StatutPaiement.EN_ATTENTE
    )
    mois_couvert = models.PositiveSmallIntegerField(
        _('mois couvert'),
        validators=[MinValueValidator(1), MaxValueValidator(12)]
    )
    annee_couverte = models.PositiveIntegerField(
        _('année couverte')
    )
    mode_paiement = models.CharField(
        _('mode de paiement'),
        max_length=50,
        default='Espèces',
        help_text=_('Ex: Espèces, Virement, Chèque, etc.')
    )
    reference = models.CharField(
        _('référence'),
        max_length=50,
        blank=True,
        null=True,
        help_text=_('Numéro de référence du paiement')
    )
    commentaire = models.TextField(
        _('commentaire'),
        blank=True,
        null=True
    )
    date_creation = models.DateTimeField(
        _('date de création'),
        auto_now_add=True
    )
    cree_par = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='paiements_crees',
        verbose_name=_('créé par')
    )
    secretaire = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        limit_choices_to={'role__in': [User.Role.ADMIN, User.Role.SECRETARIAT]},
        related_name='paiements_enregistres',
        verbose_name=_('secrétaire')
    )
    
    class Meta:
        verbose_name = _('paiement d\'écolage')
        verbose_name_plural = _('paiements d\'écolage')
        ordering = ['-date_paiement', 'etudiant']
    
    def __str__(self):
        return f"{self.etudiant} - {self.montant} Ar - {self.get_statut_display()}"
    
    def est_en_retard(self):
        return self.date_echeance < timezone.now().date() and self.statut != self.StatutPaiement.PAYE


class PresenceCours(models.Model):
    """Modèle pour enregistrer les présences/absences des étudiants aux cours."""
    
    class StatutPresence(models.TextChoices):
        PRESENT = 'P', _('Présent')
        ABSENT = 'A', _('Absent')
        RETARD = 'R', _('En retard')
        EXCUSE = 'E', _('Absence justifiée')
    
    etudiant = models.ForeignKey(
        Etudiant,
        on_delete=models.CASCADE,
        verbose_name=_('étudiant'),
        related_name='presences'
    )
    matiere = models.ForeignKey(
        Matiere,
        on_delete=models.CASCADE,
        verbose_name=_('matière'),
        related_name='presences'
    )
    date_cours = models.DateField(
        _('date du cours')
    )
    heure_debut = models.TimeField(
        _('heure de début')
    )
    heure_fin = models.TimeField(
        _('heure de fin')
    )
    statut = models.CharField(
        _('statut'),
        max_length=1,
        choices=StatutPresence.choices,
        default=StatutPresence.PRESENT
    )
    justificatif = models.TextField(
        _('justificatif'),
        blank=True,
        null=True
    )
    date_creation = models.DateTimeField(
        _('date de création'),
        auto_now_add=True
    )
    cree_par = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='presences_enregistrees',
        verbose_name=_('enregistré par')
    )
    
    class Meta:
        verbose_name = _('présence au cours')
        verbose_name_plural = _('présences aux cours')
        ordering = ['-date_cours', 'heure_debut', 'etudiant']
        unique_together = ['etudiant', 'matiere', 'date_cours']
    
    def __str__(self):
        return f"{self.etudiant} - {self.matiere} - {self.date_cours} - {self.get_statut_display()}"


class EmploiDuTemps(models.Model):
    """Modèle pour gérer l'emploi du temps des classes."""
    
    class JourSemaine(models.TextChoices):
        LUNDI = 'LUN', _('Lundi')
        MARDI = 'MAR', _('Mardi')
        MERCREDI = 'MER', _('Mercredi')
        JEUDI = 'JEU', _('Jeudi')
        VENDREDI = 'VEN', _('Vendredi')
        SAMEDI = 'SAM', _('Samedi')
    
    filiere = models.ForeignKey(
        Filiere,
        on_delete=models.CASCADE,
        verbose_name=_('filière'),
        related_name='emplois_du_temps'
    )
    niveau = models.ForeignKey(
        Niveau,
        on_delete=models.CASCADE,
        verbose_name=_('niveau'),
        related_name='emplois_du_temps'
    )
    matiere = models.ForeignKey(
        Matiere,
        on_delete=models.CASCADE,
        verbose_name=_('matière'),
        related_name='emplois_du_temps'
    )
    enseignant = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        limit_choices_to={'role': User.Role.ENSEIGNANT},
        verbose_name=_('enseignant'),
        related_name='cours_donnes'
    )
    jour = models.CharField(
        _('jour'),
        max_length=3,
        choices=JourSemaine.choices
    )
    heure_debut = models.TimeField(
        _('heure de début')
    )
    heure_fin = models.TimeField(
        _('heure de fin')
    )
    salle = models.CharField(
        _('salle'),
        max_length=50,
        blank=True,
        null=True
    )
    est_actif = models.BooleanField(
        _('est actif'),
        default=True
    )
    date_debut = models.DateField(
        _('date de début de validité')
    )
    date_fin = models.DateField(
        _('date de fin de validité'),
        blank=True,
        null=True
    )
    date_creation = models.DateTimeField(
        _('date de création'),
        auto_now_add=True
    )
    cree_par = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='emplois_du_temps_crees',
        verbose_name=_('créé par')
    )
    
    class Meta:
        verbose_name = _('emploi du temps')
        verbose_name_plural = _('emplois du temps')
        ordering = ['jour', 'heure_debut']
        unique_together = ['filiere', 'niveau', 'jour', 'heure_debut', 'heure_fin']
    
    def __str__(self):
        return f"{self.get_jour_display()} {self.heure_debut.strftime('%H:%M')}-{self.heure_fin.strftime('%H:%M')} - {self.matiere} - {self.filiere} {self.niveau}"
    
    def duree(self):
        """Calcule la durée du cours en heures."""
        from datetime import datetime, time
        
        if not hasattr(self, 'heure_debut') or not hasattr(self, 'heure_fin') or not self.heure_debut or not self.heure_fin:
            return 0.0
            
        try:
            debut = datetime.combine(datetime.today(), self.heure_debut)
            fin = datetime.combine(datetime.today(), self.heure_fin)
            duree = fin - debut
            return duree.total_seconds() / 3600  # Convertir en heures
        except (TypeError, ValueError):
            return 0.0
