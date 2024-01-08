import VerBad from "../../assets/images/very_bad_emoji.png";
import Bad from "../../assets/images/bad_emoji.png";
import Neutral from "../../assets/images/neutral_emoji.png";
import Good from "../../assets/images/good_emoji.png";
import VeryGood from "../../assets/images/very_good_emoji.png";

const ratingValues = [
    { value: 1, label: 'Very bad', imgSrc: VerBad, alt: 'Very bad' },
    { value: 2, label: 'Bad', imgSrc: Bad, alt: 'Bad' },
    { value: 3, label: 'Neutral', imgSrc: Neutral, alt: 'Neutral' },
    { value: 4, label: 'Good', imgSrc: Good, alt: 'Good' },
    { value: 5, label: 'Very Good', imgSrc: VeryGood, alt: 'Very Good' },
  ];
  
  export default ratingValues;
  