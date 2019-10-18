const fs = require('fs')

require('dotenv').config()

let content


const CRLF = '\r\n'
const TAB = '\t'

const accesLog = fs.readFile(`${process.env.FILE_ACCESS}`, { encoding: 'utf8' }, (err, data) => {
	if (err) {
		throw err
	}
	content = data.toString().split(CRLF).map((row) => {
		// eine Zeile
		const oneRow = row.split(TAB)

		// einzelne Werte der Zeile
		const ts = new Date(oneRow[0])
		const type = oneRow[1]
		const number = oneRow[2]
		const address = oneRow[3]
		const message = oneRow[4]

		// eine Zeile als Objekt
		let dataObj = {
			ts,
			type,
			number,
			address,
			message,
		}
		return dataObj
	})

	// Invoke the next step here however you like
	//	console.log(content) // Put all of the code here (not the best solution)
	processFile()
})

/**
 * Struktur der Log Dataien
 * @TimeStamp
 * @Typ
 * @Nummer
 * @Server
 * @Meldung
 */

const processFile = () => {
	console.log(content)
}

console.log(accesLog)
