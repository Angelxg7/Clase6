import * as SQLITE from 'expo-sqlite'

const db = SQLITE.openDatabase('sessionUser2.db');

export const init = () => {
    const promise = new Promise((resolve,reject)=> {
        db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS sessionUser2 (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, idToken TEXT NOT NULL)',
            [],
            ()=> resolve(),
            (_, error)=> {reject(error)})
        })
    })
    return promise
}

export const insertSession = ({
    email,
    localId,
    idToken
}) => {
    const promise = new Promise((resolve,reject)=> {
        db.transaction(tx => {
            tx.executeSql(
            'INSERT INTO sessionUser2 (email, localId, idToken) VALUES (?,?,?);',
            [email, localId, idToken],
            (_, result)=> resolve(result),
            (_, error)=> reject(error)
            )
        })
    })
    return promise
}

export const fetchSession = () => {
    const promise = new Promise((resolve,reject)=> {
        db.transaction(tx => {
            tx.executeSql(
            'SELECT * FROM sessionUser2',
            [],
            (_, result)=> resolve(result),
            (_, error)=> reject(error)
            )
        })
    })
    return promise
}

export const deleteAllSession = () => {
    const promise = new Promise((resolve,reject)=> {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM sessionUser2',
            [],
            (_,result)=> resolve(result),
            (_,error)=> reject(error))
        })
    })
    return promise
}