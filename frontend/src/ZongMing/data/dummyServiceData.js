import images from "./images";
import dog1 from "../assets/image/dog1.jpg";
import dog2 from "../assets/image/dog2.jpg";
import dog3 from "../assets/image/dog3.jpeg";
import dog4 from "../assets/image/dog4.jpeg";
import dog5 from "../assets/image/dog5.jpeg";
import dog6 from "../assets/image/dog6.jpeg";

export const dummyServiceData = [
    {
      serviceTitle: "Haircut",
      serviceImages: [ images[1].imgURL,dog6],
      description: "Professional haircut service",
      price: "30",
      ratings: {
        total: 61,
        1: 1,
        2: 1,
        3: 17,
        4: 22,
        5: 20,
      },
      comments: [
        { name: "Emma", content: "Great post! Very informative." },
        { name: "Liam", content: "I love Labradors! They're the best." },
        { name: "Olivia", content: "Such a heartwarming story. Thanks for sharing!" },
        { name: "Noah", content: "Labradors are amazing companions. Max sounds like a wonderful dog." },
        { name: "Ava", content: "Labrador Retrievers are so adorable!" },
        { name: "William", content: "German Shepherds are such intelligent dogs." },
        { name: "Sophia", content: "I had a Golden Retriever too. They're the sweetest dogs." },
        { name: "James", content: "Bulldogs have such unique personalities. Bruno sounds like a great dog." },
        { name: "Isabella", content: "Poodles are so smart! Lily sounds like a wonderful companion." },
      ],
      createdAt: "2024-04-08T07:00:51.000Z",
    },
    {
      serviceTitle: "Manicure",
      serviceImages: [images[2].imgURL, images[3].imgURL],
      description: "Pamper your nails with our manicure service",
      price: "25",
      ratings: {
        total: 27,
        1: 1,
        2: 2,
        3: 1,
        4: 3,
        5: 20,
      },
      comments: [
        { name: "Sophia", content: "Loved the nail art designs!" },
        { name: "Aiden", content: "Very relaxing experience." },
      ],
      createdAt: "2024-04-08T08:30:21.000Z",
    },
    {
      serviceTitle: "Massage Therapy",
      serviceImages: [dog1,dog2],
      description: "Relax and unwind with our massage therapy service",
      price: "50",
      ratings: {
        total: 51,
        1: 1,
        2: 2,
        3: 4,
        4: 4,
        5: 40,
      },
      comments: [
        { name: "Ella", content: "Best massage I've ever had!" },
        { name: "Jack", content: "Highly recommend their services." },
      ],
      createdAt: "2024-04-08T10:45:12.000Z",
    },
    {
      serviceTitle: "Facial Treatment",
      serviceImages: [dog3, dog4],
      description: "Revitalize your skin with our facial treatment service",
      price: "35",
      ratings: {
        total: 12,
        1: 0,
        2: 1,
        3: 3,
        4: 4,
        5: 4,
      },
      comments: [
        { name: "Sophie", content: "My skin feels so refreshed after the facial!" },
        { name: "Leo", content: "Great service, will definitely come back." },
      ],
      createdAt: "2024-04-08T12:15:30.000Z",
    },
    {
      serviceTitle: "Yoga Classes",
      serviceImages: [dog5, dog6],
      description: "Join our yoga classes for relaxation and flexibility",
      price: "20",
      ratings: {
        total: 6,
        1: 0,
        2: 0,
        3: 1,
        4: 2,
        5: 3,
      },
      comments: [
        { name: "Lily", content: "Love the yoga instructor! Very calming." },
        { name: "Max", content: "Great for beginners." },
      ],
      createdAt: "2024-04-08T14:30:00.000Z",
    },
    {
      serviceTitle: "Fitness Training",
      serviceImages: [dog6,dog2],
      description: "Get fit with our personalized fitness training sessions",
      price: "40",
      ratings: {
        total: 20,
        1: 2,
        2: 3,
        3: 4,
        4: 6,
        5: 5,
      },
      comments: [
        { name: "Jake", content: "Really pushed me to my limits, but worth it!" },
        { name: "Hannah", content: "Excellent trainers and facilities." },
      ],
      createdAt: "2024-04-08T16:45:00.000Z",
    },
    {
      serviceTitle: "Cooking Classes",
      serviceImages: [images[0].imgURL, images[1].imgURL],
      description: "Learn to cook delicious dishes with our cooking classes",
      price: "45",
      ratings: {
        total: 18,
        1: 1,
        2: 2,
        3: 4,
        4: 5,
        5: 6,
      },
      comments: [
        { name: "Emily", content: "Had so much fun and learned a lot!" },
        { name: "Ben", content: "The recipes were amazing!" },
      ],
      createdAt: "2024-04-08T18:00:00.000Z",
    },
  ];
  
  export default dummyServiceData;