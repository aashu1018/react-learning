const TRIVIA_QUESTIONS = [
    {
        question: 'Which Indian city is most famous for Hyderabadi biryani?',
        options: ['Hyderabad', 'Goa', 'Shimla', 'Jaipur'],
        answer: 'Hyderabad',
    },
    {
        question: 'Paneer is made from which ingredient?',
        options: ['Soy beans', 'Milk', 'Wheat', 'Coconut'],
        answer: 'Milk',
    },
    {
        question: 'Vada pav is classic street food from which city?',
        options: ['Kolkata', 'Chennai', 'Mumbai', 'Lucknow'],
        answer: 'Mumbai',
    },
    {
        question: 'A dosa batter is typically made from?',
        options: ['Only wheat flour', 'Rice and lentils', 'Cornmeal', 'Potato mash'],
        answer: 'Rice and lentils',
    },
    {
        question: 'Tacos originally come from which country?',
        options: ['Spain', 'Mexico', 'Peru', 'Italy'],
        answer: 'Mexico',
    },
    {
        question: 'Sushi is most closely associated with which country?',
        options: ['Korea', 'Thailand', 'Japan', 'Vietnam'],
        answer: 'Japan',
    },
    {
        question: 'Rasgulla is primarily made from?',
        options: ['Chhena (cottage cheese)', 'Semolina', 'Rice flour', 'Cornstarch'],
        answer: 'Chhena (cottage cheese)',
    },
    {
        question: 'Espresso is a brewing style from which country?',
        options: ['France', 'Italy', 'Brazil', 'Turkey'],
        answer: 'Italy',
    },
    {
        question: 'Which spice is turmeric?',
        options: ['A red chilli powder', 'A yellow-orange root spice', 'A dried flower', 'A type of salt'],
        answer: 'A yellow-orange root spice',
    },
    {
        question: 'Butter chicken is widely said to have been invented in?',
        options: ['Delhi', 'Amritsar', 'Bengaluru', 'Kochi'],
        answer: 'Delhi',
    },
    {
        question: 'Matcha is made from?',
        options: ['Coffee beans', 'Green tea leaves', 'Cocoa nibs', 'Mint'],
        answer: 'Green tea leaves',
    },
    {
        question: 'Pizza Margherita’s colors are said to echo which flag?',
        options: ['French', 'Mexican', 'Italian', 'Irish'],
        answer: 'Italian',
    },
];

export const QUESTIONS_PER_ROUND = 5;

export const shuffle = (items) => {
    const next = [...items];

    for (let i = next.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [next[i], next[j]] = [next[j], next[i]];
    }

    return next;
};

export const getTriviaRound = () =>
    shuffle(TRIVIA_QUESTIONS).slice(0, QUESTIONS_PER_ROUND);
