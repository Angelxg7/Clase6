import * as SQLITE from 'expo-sqlite'

const db = SQLITE.openDatabase('session.db');

export const init = () => {
    const promise = new Promise((resolve,reject)=> {
        db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS session (localId TEXT PRIMARYKEY NOT NULL, email TEXT NOT NULL, idToken TEXT NOT NULL)',
            [],
            ()=> resolve(),
            (_,error)=> reject(error))
        })
    })
    return promise
}

export const insertSession = (email,localId,idToken) => {
    const promise = new Promise((resolve,reject)=> {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO session (email,localId,idToken) VALUES (?,?,?);',
            [email,localId,idToken],
            (_,result)=> resolve(result),
            (_,error)=> reject(error))
        })
    })
    return promise
}

export const fetchSession = (localId) => {
    const promise = new Promise((resolve,reject)=> {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM session WHERE localId = ?',
            [localId],
            (_,result)=> resolve(result),
            (_,error)=> reject(error))
        })
    })
    return promise
}

export const deleteAllSession = () => {
    const promise = new Promise((resolve,reject)=> {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM session',
            [],
            (_,result)=> resolve(result),
            (_,error)=> reject(error))
        })
    })
    return promise
}