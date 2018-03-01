import Evernote from 'evernote'
import EvernoteService from '../services/EvernoteService'
import showdown from 'showdown'
const converter = new showdown.Converter({
  extensions: [{
    type: 'output',
    regex: new RegExp(`<code>`, 'g'),
    replace: `<code>`
  }],
  noHeaderId: true // important to add this, else regex match doesn't work
})

var md = require('markdown-it')({
  html:true,
  langPrefix:   '',
  highlight: function (/*str, lang*/) { return ''; }
})



class Home {
  async index(ctx) {
    if (ctx.session && ctx.session.oauthAccessToken) {
      const NoteService = new EvernoteService({
        token: ctx.session.oauthAccessToken
      })
      const noteList = await NoteService.getNotes()
      let notebooks = noteList.map(({
        guid,
        name,
        defaultNotebook,
        updateSequenceNum,
        serviceCreated,
        serviceUpdated
      }) => ({
        guid,
        name,
        defaultNotebook,
        updateSequenceNum,
        serviceCreated,
        serviceUpdated
      }))
      return ctx.render('home', {
        notebooks
      })
    } else {
      return ctx.redirect('/oauth')
    }
  }


  async note(ctx) {
    const { guid } = ctx.params;
    try {
      const NoteService = new EvernoteService({
        token: ctx.session.oauthAccessToken
      })

      var filter = new Evernote.NoteStore.NoteFilter({
        notebookGuid: guid,
        ascending: true
      });
      var spec = new Evernote.NoteStore.NotesMetadataResultSpec({
        includeTitle: true,
        includeContentLength: true,
        includeCreated: true,
        includeUpdated: true,
        includeDeleted: true,
        includeUpdateSequenceNum: true,
        includeNotebookGuid: true,
        includeTagGuids: true,
        includeAttributes: true,
        includeLargestResourceMime: true,
        includeLargestResourceSize: true,
      });
     let res = await NoteService.noteStore.findNotesMetadata(filter, 2, 10, spec)

      const notebooks = res.notes.map(({ guid, title, created, updated, tagGuids }) => ({
        guid, title, created, updated, tagGuids
      }))
      return ctx.render('notes', {
        notebooks
      })
    } catch(e) {
      // statements
      ctx.status = 500
      ctx.body = JSON.stringify(e)
    }
  }

  async note_detail(ctx) {
    const { guid } = ctx.params;
    try {
      const NoteService = new EvernoteService({
        token: ctx.session.oauthAccessToken
      })
      let res = await NoteService.noteStore.getNoteContent(guid)
      console.log('res', res);
      ctx.body = res
      // return ctx.render('note', {
      //   res
      // })

    } catch(e) {
      ctx.status = 500
      ctx.body = JSON.stringify(e)
    }
  }

  async create(ctx) {
    if (ctx.session && ctx.session.oauthAccessToken) {
      const NoteService = new EvernoteService({
        token: ctx.session.oauthAccessToken
      })
      const noteList = await NoteService.getNotes()
      let notebooks = noteList.map(({
        guid,
        name,
        defaultNotebook,
        updateSequenceNum,
        serviceCreated,
        serviceUpdated
      }) => ({
        guid,
        name,
        defaultNotebook,
        updateSequenceNum,
        serviceCreated,
        serviceUpdated
      }))
      return ctx.render('create', {
        notebooks
      })
    } else {
      return ctx.redirect('/oauth')
    }
  }

  async post_create(ctx) {
    const { title, content, guid } = ctx.request.body
    try {
      const NoteService = new EvernoteService({
        token: ctx.session.oauthAccessToken
      })

      var nBody = '<?xml version="1.0" encoding="UTF-8"?>';
      nBody += '<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd">';
      nBody += '<en-note>'+md.render(content)+'</en-note>';
      nBody = nBody.replace(/class=\"md\"/ig, '')
      var ourNote = new Evernote.Types.Note();
      ourNote.title = title;
      ourNote.content = nBody;
      ourNote.notebookGuid = guid;
      // Attempt to create note in Evernote account (returns a Promise)
     let res = await NoteService.noteStore.createNote(ourNote)
     return ctx.render('create', {
        newguid: res.guid
      })

    } catch(e) {
      // statements
      console.log('res', JSON.stringify(e));
      ctx.status = 500
      ctx.body = JSON.stringify(e)
    }
  }

  async post_delete(ctx) {
    const { guid } = ctx.request.body
    try {
      const NoteService = new EvernoteService({
        token: ctx.session.oauthAccessToken
      })
      let res = await NoteService.noteStore.deleteNote(guid)
      ctx.body = res
    } catch(e) {
      // statements
      ctx.status = 500
      ctx.body = JSON.stringify(e)
    }
  }
}

module.exports = new Home()