from django.urls import path
from Notes.views import getNotes, createNote, fetchNote, deleteNote, updateNote
urlpatterns = [
  path('get-notes/',getNotes, name="get_notes" ),
  path('create-note/',createNote, name="create_note" ),
  path('fetch-note/<slug:slug>/',fetchNote, name="fetch_note" ),
  path('delete-note/<slug:slug>/',deleteNote, name="delete_note" ),
  path('update-note/<slug:slug>/',updateNote, name="update_note" ),  
]