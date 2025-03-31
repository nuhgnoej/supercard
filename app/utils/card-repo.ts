export type Card = {
    title : string;
    content : string;
    tier : number;
    superCard? : string;
    box : number;
    answer? : string;
    startDate : string;
    lastReview : string;
    nextReview : string;
    reviewCount : number;
    reviewInterval : number;
    class? : string;
}

export type CardProp = {    
    title : string;
    content : string;
    tier : number;
    answer? : string; 
    superCard? : string;    
}

export const makeCard = (card:CardProp) => {
    const startDate = new Date().toISOString().split("T")[0];
    const lastReview = startDate;
    const reviewInterval = 1;
    // const nextReview = new Date(new Date().getTime()+reviewInterval*24*3600*1000).toISOString().split("T")[0];
    const nextReview = lastReview; // test
    const reviewCount = 0; 
    const box = 1;   
    return {...card, startDate, lastReview, reviewInterval, nextReview, reviewCount, box}
}

