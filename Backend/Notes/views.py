from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializer import NoteSerializer
from .models import Note


@api_view(['GET'])
def getNotes(request):
  if request.method == "GET":
    notes_obj = Note.objects.all()
    serailizer = NoteSerializer(notes_obj, many = True)
    return Response(serailizer.data)
  
@api_view(['POST'])
def createNote(request):
  if request.method == "POST":
    data = request.data
    serializer = NoteSerializer(data=data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors)
  
@api_view(['GET'])
def fetchNote(request, slug):
  if request.method == "GET":
    note_obj = Note.objects.filter(slug = slug)
    serailizer = NoteSerializer(note_obj, many = True)
    return Response(serailizer.data)
  
@api_view(['PUT', 'PATCH'])
def updateNote(request, slug):
  if request.method == "PUT":
    data = request.data
    note_obj = Note.objects.get(slug = data['slug'])
    
    serializer = NoteSerializer(note_obj, data=data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
  
    return Response(serializer.errors)
  
  if request.method == "PATCH":
    data = request.data
    note_obj = Note.objects.get(slug = data['slug'])
    
    serializer = NoteSerializer(note_obj, data=data, partial = True)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
  
    return Response(serializer.errors)
  
@api_view(['DELETE'])
def deleteNote(request, slug):
  if request.method == "DELETE":
    note_obj = Note.objects.filter(slug = slug).first()
    title = note_obj.title
    note_obj.delete()
    return Response({"message":f"Successfully Deleted Notes Of title {title}"})