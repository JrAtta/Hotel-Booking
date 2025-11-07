import { Injectable, signal, WritableSignal } from '@angular/core';
import { Iactivities } from '../interfaces/iactivities';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesToChoose {
  activities : WritableSignal<Iactivities[]> = signal([
    {
      id: 1,
      name: 'Green Lake',
      category: 'Nature',
      image: 'images/green lake.jpg',
      description:
        'Enjoy a peaceful walk around the scenic Green Lake surrounded by lush greenery and mountain views.',
      price: 0,
      duration: 'Free Access',
      location: 'Kandy, Sri Lanka',
      distance: '3.2 km away',
      rating: 4.8,
      reviews: [
        { user: 'Ali', comment: 'Amazing place to relax!', rating: 5 },
        { user: 'Sara', comment: 'Loved the scenery.', rating: 4.5 },
      ],
      photos: ['images/green lake1.webp', 'images/green lake2.webp'],
      available: true,
    },
    {
      id: 2,
      name: 'Dog Clubs',
      category: 'Recreation',
      image: 'images/dogs club.webp',
      description:
        'Spend quality time with friendly dogs, enjoy play sessions and relaxing moments in an open-air pet park.',
      price: 15,
      duration: '1 hour',
      location: 'Colombo City Park',
      distance: '2.1 km away',
      rating: 4.4,
      reviews: [
        { user: 'Lina', comment: 'Super fun for families!', rating: 4.5 },
        { user: 'Hassan', comment: 'Kids loved it!', rating: 4.2 },
      ],
      photos: ['images/dogs club1.avif', 'images/dogs club2.avif'],
      available: true,
    },
    {
      id: 3,
      name: 'Labour and Wait',
      category: 'Shopping',
      image: 'images/Labour and Wait.avif',
      description:
        'Explore local crafts, handmade goods, and souvenirs at one of the most charming local markets.',
      price: 0,
      duration: 'Flexible',
      location: 'Galle Market Street',
      distance: '1.8 km away',
      rating: 4.7,
      reviews: [
        { user: 'Mina', comment: 'Nice place to buy gifts!', rating: 4.7 },
      ],
      photos: ['images/Labour and Wait1.avif', 'images/Labour and Wait2.avif'],
      available: true,
    },
    {
      id: 4,
      name: 'Snorkeling',
      category: 'Beach',
      image: 'images/Snorkeling.avif',
      description:
        'Discover the underwater world with colorful coral reefs and tropical fish guided by professionals.',
      price: 50,
      duration: '2 hours',
      location: 'Mirissa Beach',
      distance: '1.5 km away',
      rating: 4.9,
      reviews: [
        { user: 'Mina', comment: 'A must-do experience!', rating: 5 },
        { user: 'Omar', comment: 'Absolutely stunning!', rating: 4.8 },
      ],
      photos: ['images/Snorkeling1.avif', 'images/Snorkeling2.avif'],
      available: true,
    },
    {
      id: 5,
      name: 'Mountain Hike',
      category: 'Adventure',
      image: 'images/Mountain Hike.avif',
      description:
        'Join a guided hike through breathtaking mountain trails and enjoy panoramic views of nature.',
      price: 30,
      duration: '4 hours',
      location: 'Knuckles Range',
      distance: '5 km away',
      rating: 4.6,
      reviews: [
        { user: 'Kareem', comment: 'Challenging but rewarding!', rating: 4.6 },
        { user: 'Nora', comment: 'Loved the views!', rating: 4.7 },
      ],
      photos: ['images/Mountain Hike1.webp', 'images/Mountain Hike2.avif'],
      available: true,
    },
    {
      id: 6,
      name: 'Spa & Relaxation Center',
      category: 'Relaxation',
      image: 'images/Spa & Relaxation Center.avif',
      description:
        'Unwind with a full-body massage and aromatherapy session in a calming environment.',
      price: 70,
      duration: '1.5 hours',
      location: 'Central Wellness Spa',
      distance: '0.9 km away',
      rating: 4.8,
      reviews: [
        { user: 'Nada', comment: 'Perfect relaxation experience!', rating: 5 },
      ],
      photos: [
        'images/Spa & Relaxation Center1.avif',
        'images/Spa & Relaxation Center2.avif',
      ],
      available: true,
    },
    {
      id: 7,
      name: 'Cultural Show',
      category: 'Entertainment',
      image: 'images/Cultural Show.avif',
      description:
        'Enjoy a live traditional dance and music show that reflects the rich local culture.',
      price: 25,
      duration: '1 hour',
      location: 'Kandy Cultural Hall',
      distance: '1 km away',
      rating: 4.5,
      reviews: [
        { user: 'Yara', comment: 'Loved the costumes and music!', rating: 4.5 },
      ],
      photos: ['images/Cultural Show1.avif', 'images/Cultural Show2.avif'],
      available: true,
    },
    {
      id: 8,
      name: 'Boat Ride',
      category: 'Nature',
      image: 'images/Boat Ride.avif',
      description:
        'Take a relaxing boat ride across the lake with scenic views and peaceful vibes.',
      price: 20,
      duration: '1 hour',
      location: 'Lake View Pier',
      distance: '2.3 km away',
      rating: 4.7,
      reviews: [
        { user: 'Mahmoud', comment: 'Very relaxing trip!', rating: 4.7 },
      ],
      photos: ['images/Boat Ride1.avif', 'images/Boat Ride2.avif'],
      available: true,
    },
  ]);
  getActivities() {
    return this.activities();
  }
  getactivityById(id:number){
  return this.activities().find(activity => activity.id === id)
  }
}
