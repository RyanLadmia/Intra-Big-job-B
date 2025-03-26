import React, { useState, useEffect } from 'react';
import { formationService } from '../lib/services/formationService';
import authService from '../lib/services/authService';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, UserPlus, UserMinus, Users, ChevronDown, ChevronUp, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const FormationList = () => {
  const [formations, setFormations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormation, setEditFormation] = useState(null);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [availableStudents, setAvailableStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFormation, setExpandedFormation] = useState(null);
  const [hasCreatePermission, setHasCreatePermission] = useState(false);
  const [newFormation, setNewFormation] = useState({
    name: '',
    promotion: '',
    description: ''
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDeleteStudentIds, setSelectedDeleteStudentIds] = useState([]);

  useEffect(() => {
    loadFormations();
    checkPermissions();
  }, []);

  const loadFormations = async () => {
    try {
      setLoading(true);
      const response = await formationService.getAllFormations();
      if (response.success === false) {
        toast.error(response.message.replace(' (simulation)','') || 'Erreur lors du chargement des formations');
        return;
      }
      setFormations(response);
    } catch (error) {
      console.error('Erreur lors du chargement des formations:', error);
      toast.error('Erreur lors du chargement des formations');
    } finally {
      setLoading(false);
    }
  };

  const checkPermissions = () => {
    const isTeacher = authService.hasRole('teacher');
    const isAdmin = authService.hasRole('admin');
    const isSuperAdmin = authService.hasRole('superadmin');
    setHasCreatePermission(isTeacher || isAdmin || isSuperAdmin);
  };

  const showAddStudentModal = async (formation) => {
    setSelectedFormation(formation);
    try {
      const response = await formationService.getAvailableStudents(formation.id);
      if (response.success === false) {
        toast.error(response.message.replace(' (simulation)','') || 'Erreur lors du chargement des étudiants disponibles');
        return;
      }
      setAvailableStudents(response);
      setSelectedStudentIds([]);
      setShowModal(true);
    } catch (error) {
      console.error('Erreur lors du chargement des étudiants disponibles:', error);
      toast.error('Erreur lors du chargement des étudiants disponibles');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedFormation(null);
    setSelectedStudentIds([]);
    setAvailableStudents([]);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    setNewFormation({ name: '', promotion: '', description: '' });
  };

  const openEditModal = (formation) => {
    setEditFormation(formation);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditFormation(null);
  };

  const toggleStudent = (studentId) => {
    setSelectedStudentIds(prev => {
      if (prev.includes(studentId)) {
        return prev.filter(id => id !== studentId);
      } else {
        return [...prev, studentId];
      }
    });
  };

  const handleCreateFormation = async (e) => {
    e.preventDefault();
    if (!newFormation.name || !newFormation.promotion) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await formationService.createFormation(newFormation);
      if (response.success === false) {
        toast.error(response.message.replace(' (simulation)','') || 'Erreur lors de la création de la formation');
        return;
      }
      toast.success('Formation créée avec succès');
      await loadFormations();
      closeCreateModal();
    } catch (error) {
      console.error('Erreur lors de la création de la formation:', error);
      toast.error('Erreur lors de la création de la formation');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateFormation = async (e) => {
    e.preventDefault();
    if (!editFormation.name || !editFormation.promotion) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    try {
      setIsSubmitting(true);
      const response = await formationService.updateFormation(editFormation.id, editFormation);
      if (response.success === false) {
        toast.error(response.message.replace(' (simulation)','') || 'Erreur lors de la mise à jour de la formation');
        return;
      }
      toast.success('Formation mise à jour avec succès');
      // Update the formation in the state directly:
      setFormations(prev => prev.map(f => f.id === editFormation.id ? { ...f, ...editFormation } : f));
      closeEditModal();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la formation:', error);
      toast.error('Erreur lors de la mise à jour de la formation');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteFormation = async () => {
    if (!editFormation) return;
    try {
      const response = await formationService.deleteFormation(editFormation.id);
      if (response.success === false) {
        toast.error(response.message.replace(' (simulation)','') || 'Erreur lors de la suppression de la formation');
        return;
      }
      toast.success('Formation supprimée avec succès');
      // Remove the formation from state directly:
      setFormations(prev => prev.filter(f => f.id !== editFormation.id));
      closeEditModal();
    } catch (error) {
      console.error('Erreur lors de la suppression de la formation:', error);
      toast.error('Erreur lors de la suppression de la formation');
    }
  };

  const addStudents = async () => {
    if (selectedStudentIds.length === 0 || !selectedFormation) {
      toast.error('Veuillez sélectionner au moins un étudiant');
      return;
    }

    try {
      const promises = selectedStudentIds.map(studentId =>
        formationService.addStudentToFormation(selectedFormation.id, studentId)
      );
      
      await Promise.all(promises);
      toast.success('Étudiants ajoutés avec succès');
      await loadFormations();
      closeModal();
    } catch (error) {
      console.error('Erreur lors de l\'ajout des étudiants:', error);
      toast.error('Erreur lors de l\'ajout des étudiants');
    }
  };

  const toggleFormationExpand = (formationId) => {
    setExpandedFormation(expandedFormation === formationId ? null : formationId);
  };

  const handleRemoveStudent = async (formationId, studentId) => {
    try {
      await formationService.removeStudentFromFormation(formationId, studentId);
      toast.success("Étudiant retiré avec succès");
      setFormations(prev =>
        prev.map(f => 
          f.id === formationId 
            ? { ...f, students: f.students.filter(student => student.id !== studentId) } 
            : f
        )
      );
    } catch (error) {
      toast.error("Erreur lors du retrait de l'étudiant");
    }
  };

  const showDeleteStudentModal = (formation) => {
    setSelectedFormation(formation);
    setSelectedDeleteStudentIds([]); // clear previous selection
    setShowDeleteModal(true);
  };

  const toggleDeleteStudent = (studentId) => {
    setSelectedDeleteStudentIds(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const removeStudents = async () => {
    if (selectedDeleteStudentIds.length === 0 || !selectedFormation) {
      toast.error('Veuillez sélectionner au moins un étudiant à supprimer');
      return;
    }
    try {
      const promises = selectedDeleteStudentIds.map(studentId =>
        formationService.removeStudentFromFormation(selectedFormation.id, studentId)
      );
      await Promise.all(promises);
      toast.success('Étudiants supprimés avec succès');
      // Update formation's student list in state
      setFormations(prev =>
        prev.map(f =>
          f.id === selectedFormation.id
            ? { ...f, students: f.students.filter(s => !selectedDeleteStudentIds.includes(s.id)) }
            : f
        )
      );
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Erreur lors du retrait d'étudiants :", error);
      toast.error("Erreur lors du retrait des étudiants");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-2xl font-bold">Gestion des Formations</CardTitle>
          {hasCreatePermission && (
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Créer formation
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom de la formation</TableHead>
                <TableHead>Promotion</TableHead>
                <TableHead>Étudiants</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formations.map((formation) => (
                <React.Fragment key={formation.id}>
                  <TableRow className="cursor-pointer hover:bg-gray-50" onClick={() => toggleFormationExpand(formation.id)}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {expandedFormation === formation.id ? <ChevronUp className="w-4 h-4 mr-2" /> : <ChevronDown className="w-4 h-4 mr-2" />}
                        {formation.name}
                      </div>
                    </TableCell>
                    <TableCell>{formation.promotion}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        <Badge variant="secondary">
                          {formation.students.length} étudiants
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(formation);
                        }}
                      >
                        Modifier
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          showAddStudentModal(formation);
                        }}
                        className="ml-2"
                      >
                        <UserPlus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          showDeleteStudentModal(formation);
                        }}
                        className="ml-2"
                      >
                        <UserMinus className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  {expandedFormation === formation.id && (
                    <TableRow>
                      <TableCell colSpan={4} className="bg-gray-50 p-4">
                        <div className="space-y-4">
                          {formation.description && (
                            <div className="bg-white p-3 rounded-md shadow-sm">
                              <h4 className="font-medium text-sm text-gray-700 mb-2">Description de la formation :</h4>
                              <p className="text-gray-600 text-sm whitespace-pre-wrap">{formation.description}</p>
                            </div>
                          )}
                          <div>
                            <h4 className="font-medium text-sm text-gray-700 mb-2">Liste des étudiants inscrits :</h4>
                            {formation.students.length > 0 ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                {formation.students.map(student => (
                                  <div key={student.id} className="flex items-center space-x-2 p-2 bg-white rounded-md shadow-sm">
                                    <Users className="h-4 w-4 text-gray-500" />
                                    <span>{student.firstName} {student.lastName}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-gray-500 italic">Aucun étudiant inscrit</p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal d'ajout d'étudiants */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter des étudiants à {selectedFormation?.name}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              {availableStudents.map((student) => (
                <div key={student.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`student-${student.id}`}
                    checked={selectedStudentIds.includes(student.id)}
                    onCheckedChange={() => toggleStudent(student.id)}
                  />
                  <label
                    htmlFor={`student-${student.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {student.firstName} {student.lastName}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeModal}>
              Annuler
            </Button>
            <Button onClick={addStudents}>
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de suppression d'étudiants */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer des étudiants de {selectedFormation?.name}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              {selectedFormation?.students && selectedFormation.students.length > 0 ? (
                selectedFormation.students.map((student) => (
                  <div key={student.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`delete-student-${student.id}`}
                      checked={selectedDeleteStudentIds.includes(student.id)}
                      onCheckedChange={() => toggleDeleteStudent(student.id)}
                    />
                    <label
                      htmlFor={`delete-student-${student.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {student.firstName} {student.lastName}
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">Aucun étudiant inscrit</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Annuler
            </Button>
            <Button onClick={removeStudents}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de création de formation */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Créer une nouvelle formation</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateFormation}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nom de la formation</Label>
                <Input
                  id="name"
                  value={newFormation.name}
                  onChange={(e) => setNewFormation(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Entrez le nom de la formation"
                  disabled={isSubmitting}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="promotion">Promotion</Label>
                <Input
                  id="promotion"
                  value={newFormation.promotion}
                  onChange={(e) => setNewFormation(prev => ({ ...prev, promotion: e.target.value }))}
                  placeholder="Entrez la promotion"
                  disabled={isSubmitting}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newFormation.description}
                  onChange={(e) => setNewFormation(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Entrez une description (optionnel)"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeCreateModal} disabled={isSubmitting}>
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Création en cours...
                  </>
                ) : (
                  'Créer la formation'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal d'édition / détails avec options Modifier et Supprimer */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier la formation</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateFormation}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Nom</Label>
                <Input id="edit-name" value={editFormation?.name || ''} onChange={(e) => setEditFormation(prev => ({ ...prev, name: e.target.value }))} placeholder="Nom de la formation" disabled={isSubmitting} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-promotion">Promotion</Label>
                <Input id="edit-promotion" value={editFormation?.promotion || ''} onChange={(e) => setEditFormation(prev => ({ ...prev, promotion: e.target.value }))} placeholder="Promotion" disabled={isSubmitting} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <textarea id="edit-description" className="min-h-[80px] w-full rounded-md border px-3 py-2 text-sm" value={editFormation?.description || ''} onChange={(e) => setEditFormation(prev => ({ ...prev, description: e.target.value }))} placeholder="Description (optionnel)" disabled={isSubmitting} />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeEditModal} disabled={isSubmitting}>
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Mise à jour...
                  </>
                ) : (
                  'Modifier'
                )}
              </Button>
              <Button type="button" variant="destructive" onClick={handleDeleteFormation} disabled={isSubmitting} className="ml-2">
                Supprimer
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormationList;
