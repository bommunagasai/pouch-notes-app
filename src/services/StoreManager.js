import PouchDB from 'pouchdb-browser'
import PouchFind from 'pouchdb-find'
PouchDB.plugin(PouchFind)

import { v1 as uuid } from 'uuid'

class StoreManager {
  constructor(dbName) {
    this.dbName = dbName
    this.dbHandler
    this.dbInfo
  }

  async createOrFindDB() {
    if (this.dbName) {
      this.dbHandler = new PouchDB(this.dbName)
    } else {
      throw new Error('Error: Database name is not specified in constructor')
    }
  }

  async getDbInfo() {
    if (this.dbInfo) {
      return this.dbInfo
    }
    this.dbInfo = await this.dbHandler.info()
    return this.dbInfo
  }

  async getAppSettings() {
    const appSettings = await this.dbHandler.get('APP_SETTINGS')
    return appSettings
  }

  async updateAppSettings({ theme, username, _rev }) {
    await this.createOrFindDB()
    const appSettings = await this.dbHandler.put({
      _id: 'APP_SETTINGS',
      theme,
      username,
      _rev,
    })
    return appSettings
  }

  async getAllNotes() {
    const allNotes = await this.dbHandler.find({
      selector: { _id: { $gte: 'NOTES-' } },
      // sort: ['_id'],
      fields: [
        '_id',
        'metaTitle',
        'metaDescription',
        'theme',
        'type',
        '_rev',
        'pinned',
      ],
    })
    return allNotes
  }

  async createNotes({
    content,
    metaTitle,
    metaDescription,
    type,
    theme,
    _id,
    pinned,
    _rev,
  }) {
    await this.createOrFindDB()
    const note = await this.dbHandler.put({
      _id: _id || `NOTES-${uuid(0,0)}`,
      _rev,
      content,
      metaTitle,
      metaDescription,
      theme,
      type,
      pinned: !!pinned,
      createdOn: new Date(),
    })
    return note
  }

  async getNote(noteId) {
    const allNotes = await this.dbHandler.find({
      selector: { _id: noteId },
      sort: ['_id'],
      fields: [
        '_id',
        'metaTitle',
        'metaDescription',
        'theme',
        'type',
        'content',
        '_rev',
        'pinned',
      ],
    })
    return allNotes
  }

  async updateNote({
    _id,
    _rev,
    content,
    metaTitle,
    metaDescription,
    theme,
    type,
    pinned,
  }) {
    await this.createOrFindDB()
    const note = await this.getNote(_id)
    const updatedNote = await this.createNotes({
      _id,
      _rev,
      content: content || note?.docs?.[0]?.content,
      metaTitle: metaTitle || note?.docs?.[0]?.metaTitle,
      metaDescription: metaDescription || note?.docs?.[0]?.metaDescription,
      theme: theme || note?.docs?.[0]?.theme,
      type: type || note?.docs?.[0]?.type,
      pinned: pinned || note?.docs?.[0]?.pinned,
    })
    return updatedNote
  }

  async deleteNote({ _id, _rev }) {
    await this.createOrFindDB()
    const deletedNote = this.dbHandler.remove(_id, _rev)
    return deletedNote
  }
}

export default StoreManager
