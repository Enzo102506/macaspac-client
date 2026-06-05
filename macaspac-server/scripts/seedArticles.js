require('dotenv').config();
const connectDB = require('../config/db');
const mongoose = require('mongoose');
const User = require('../models/User');
const Article = require('../models/Article');

async function seed() {
  try {
    await connectDB();

    // Ensure an admin author exists
    let admin = await User.findOne({ type: 'admin' });
    if (!admin) {
      admin = await User.create({
        firstName: 'Seed',
        lastName: 'Admin',
        age: '30',
        gender: 'other',
        contactNumber: '00000000000',
        email: 'seed-admin@example.com',
        type: 'admin',
        role: 'admin',
        username: 'seedadmin',
        password: 'password',
        address: 'seed',
      });
      console.log('Created seed admin user:', admin._id);
    } else {
      console.log('Found existing admin user:', admin._id);
    }

    const demoArticles = [
      {
        slug: 'the-hollow-evolution',
        title: 'The Hollow Evolution',
        excerpt: 'Ichigo’s powers transform beyond normal limits. Explore the Hollow evolution and the threat it posed to the Soul Society.',
        category: 'Soul Reaper Lore',
        paragraphs: ['Ichigo’s powers transform beyond normal limits. Explore the Hollow evolution and the threat it posed to the Soul Society.'],
        coverImage: '',
        imageUrl: '',
        author: admin._id,
        authorRole: 'admin',
        status: 'published',
        isVisible: true,
        isActive: true,
        publishDate: new Date(),
      },
      {
        slug: 'bankai-breakthrough',
        title: 'Bankai Breakthrough',
        excerpt: 'What it means to awaken Bankai and how Ichigo used it against Ulquiorra and other deadly foes.',
        category: 'Blade Mastery',
        paragraphs: ['What it means to awaken Bankai and how Ichigo used it against Ulquiorra and other deadly foes.'],
        coverImage: '',
        imageUrl: '',
        author: admin._id,
        authorRole: 'admin',
        status: 'published',
        isVisible: true,
        isActive: true,
        publishDate: new Date(),
      },
      {
        slug: 'legacy-of-the-substitute',
        title: 'Legacy of the Substitute',
        excerpt: 'A deep dive into Ichigo’s legacy as a Substitute Soul Reaper and his impact on the world of Bleach.',
        category: 'Hero Journey',
        paragraphs: ['A deep dive into Ichigo’s legacy as a Substitute Soul Reaper and his impact on the world of Bleach.'],
        coverImage: '',
        imageUrl: '',
        author: admin._id,
        authorRole: 'admin',
        status: 'published',
        isVisible: true,
        isActive: true,
        publishDate: new Date(),
      },
    ];

    for (const art of demoArticles) {
      const exists = await Article.findOne({ slug: art.slug });
      if (exists) {
        console.log('Article exists, updating:', art.slug);
        await Article.updateOne({ _id: exists._id }, art);
      } else {
        const created = await Article.create(art);
        console.log('Inserted article:', created.slug);
      }
    }

    console.log('Seeding complete.');
    mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    mongoose.connection.close();
    process.exit(1);
  }
}

seed();
