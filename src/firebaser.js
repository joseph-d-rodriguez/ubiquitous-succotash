import * as firebase from 'firebase/app';

export function parseFirestoreHeroDoc(firebaseHeroDoc) {
	let hero = { id: firebaseHeroDoc.id },
		doc = firebaseHeroDoc.data();

	hero.changes = doc.changes;
	return hero;
};

export function newChange(hero, change) {
	var db = firebase.firestore(),
	heroesRef = db.collection('heroes'),
	heroRef = heroesRef.doc(hero.id);

	heroRef.update({
		changes: firebase.firestore.FieldValue.arrayUnion(change)
	})
		.then(() => console.log(`firestore /heroes/${hero.id} add change: ${change}`))
		.catch(e => console.error('hero update error: ', e));
};
