export const ARABIC_LETTERS = ['alif', 'ba', 'ta', 'taa', 'geem', 'hha', 'kha', 'dal', 'dhal', 'ra', 'za', 'seen', 'sheen', 'saud', 'daud', 'tau', 'dau', 'ayn', 'ghayn', 'fa', 'qaf', 'kaf', 'lam', 'meem', 'noon', 'ha', 'wow', 'ya'];

export const TASHKEEL_LETTERS = ['fata', 'kasra', 'dumma', 'fatatan', 'kasratan', 'dummatan'];

export function isTashkeel(letter) {
    return TASHKEEL_LETTERS.includes(letter);
}

export function letterFromLetter(letter) {
    switch (letter) {
        case 'alif': return '\u0627';
        case 'ba': return '\u0628';
        case 'ta': return '\u062A';
        case 'taa': return '\u062B';
        case 'geem': return '\u062C';
        case 'hha': return '\u062D';
        case 'kha': return '\u062E';
        case 'dal': return '\u062F';
        case 'dhal': return '\u0630';
        case 'ra': return '\u0631';
        case 'za': return '\u0632';
        case 'seen': return '\u0633';
        case 'sheen': return '\u0634';
        case 'saud': return '\u0635';
        case 'daud': return '\u0636';
        case 'tau': return '\u0637';
        case 'dau': return '\u0638';
        case 'ayn': return '\u0639';
        case 'ghayn': return '\u063A';
        case 'fa': return '\u0641';
        case 'qaf': return '\u0642';
        case 'kaf': return '\u0643';
        case 'lam': return '\u0644';
        case 'meem': return '\u0645';
        case 'noon': return '\u0646';
        case 'ha': return '\u0647';
        case 'wow': return '\u0648';
        case 'ya': return '\u064A';
        //
        case 'fata': return '\u064E';
        case 'kasra': return '\u0650';
        case 'dumma': return '\u064F';
        case 'fatatan': return '\u064B';
        case 'kasratan': return '\u064D';
        case 'dummatan': return '\u064C';
        //
        default: return letter;
    }
}