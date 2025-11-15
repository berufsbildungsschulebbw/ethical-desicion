// ==========================================
// USER MANAGEMENT
// ==========================================

import { db } from './config.js';
import { doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Listen von Philosophen und griechischen Buchstaben
const philosophers = [
    'Sokrates', 'Platon', 'Aristoteles', 'Kant', 'Hegel', 'Nietzsche',
    'Arendt', 'Beauvoir', 'Butler', 'Nussbaum', 'Foucault', 'Derrida',
    'Descartes', 'Spinoza', 'Locke', 'Hume', 'Mill', 'Bentham',
    'Confucius', 'Laozi', 'Zhuangzi', 'Avicenna', 'Averroes', 'Maimonides',
    'Hypatia', 'Wollstonecraft', 'Addams', 'Anscombe', 'Foot', 'Midgley'
];

const greekLetters = [
    'α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'ι', 'κ',
    'λ', 'μ', 'ν', 'ξ', 'ο', 'π', 'ρ', 'σ', 'τ', 'υ',
    'φ', 'χ', 'ψ', 'ω'
];

// Generiere zufälligen Philosophen-Username
export function generatePhilosopherUsername() {
    const philosopher = philosophers[Math.floor(Math.random() * philosophers.length)];
    const letter = greekLetters[Math.floor(Math.random() * greekLetters.length)];
    return `${philosopher}_${letter}`;
}

// Erstelle neuen User
export async function createUser(username) {
    const userData = {
        username: username,
        createdAt: new Date().toISOString(),
        completedDilemmas: [],
        totalDecisions: 0
    };
    
    localStorage.setItem('ethiklab_user', JSON.stringify(userData));
    
    if (db) {
        try {
            await setDoc(doc(db, 'users', username), userData);
            console.log('✅ User created:', username);
        } catch (error) {
            console.error('❌ Error creating user:', error);
        }
    }
    
    return userData;
}

// Hole aktuellen User
export function getCurrentUser() {
    const userJson = localStorage.getItem('ethiklab_user');
    return userJson ? JSON.parse(userJson) : null;
}

// Prüfe ob User eingeloggt ist
export function isUserLoggedIn() {
    return getCurrentUser() !== null;
}

// Markiere Dilemma als abgeschlossen
export async function markDilemmaCompleted(dilemmaId) {
    const user = getCurrentUser();
    if (!user) return;
    
    if (!user.completedDilemmas.includes(dilemmaId)) {
        user.completedDilemmas.push(dilemmaId);
        user.totalDecisions++;
        
        localStorage.setItem('ethiklab_user', JSON.stringify(user));
        
        if (db) {
            try {
                await setDoc(doc(db, 'users', user.username), user);
                console.log('✅ Progress updated');
            } catch (error) {
                console.error('❌ Error updating user:', error);
            }
        }
    }
}

// Logout
export function logout() {
    localStorage.removeItem('ethiklab_user');
    window.location.href = 'index.html';
}

// Prüfe ob Dilemma abgeschlossen
export function isDilemmaCompleted(dilemmaId) {
    const user = getCurrentUser();
    return user && user.completedDilemmas.includes(dilemmaId);
}
