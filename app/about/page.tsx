"use client";

import React from "react";

const About: React.FC = () => {
  return (
    <div className="flex justify-center px-4 py-10">
      <div className="w-full max-w-3xl border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
        <h1 className="text-3xl font-bold mb-4 text-teal-700">About NaturalCure</h1>

        <p className="text-gray-700 mb-6 text-justify">
          <strong>NaturalCure</strong> is a community-driven platform where users can share and discover effective natural remedies for everyday health issues. Whether it's a sore throat, digestive issue, or skin problem, we believe someone out there has a safe and trusted solution — and this is the place to find it.
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-teal-600 mb-2">🌿 Why We Built This</h2>
          <p className="text-gray-700 text-justify">
            While modern medicine is powerful, traditional remedies continue to provide real relief. Our mission is to preserve this natural wisdom and make it accessible for everyone — in a safe, easy-to-use space.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-teal-600 mb-2">💡 Key Features</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2 text-justify">
            <li><strong>Remedy Creation:</strong> Share detailed remedies with title, ingredients, and instructions.</li>
            <li><strong>Smart Tags:</strong> Organize and discover remedies with up to 5 relevant tags.</li>
            <li><strong>Doctor Verification:</strong> Trusted doctors are verified for authenticity and expert input.</li>
            <li><strong>Likes & Dislikes:</strong> Community feedback helps highlight the most useful remedies.</li>
            <li><strong>Comments:</strong> Users can ask questions or add their experiences to each remedy.</li>
            <li><strong>Search & Filter:</strong> Easily find relevant remedies using the built-in search functionality.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-teal-600 mb-2">🔐 Trust & Safety</h2>
          <p className="text-gray-700 text-justify">
            All remedies are moderated for quality. Users can report inappropriate content, and verified doctors are marked clearly to help users make informed decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-teal-600 mb-2">👨‍💻 Built With</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2 text-justify">
            <li><strong>Next.js</strong> with <strong>TypeScript</strong> for robust web architecture</li>
            <li><strong>Tailwind CSS</strong> for beautiful, responsive styling</li>
            <li><strong>Drizzle ORM</strong> & PostgreSQL for data handling</li>
            <li><strong>Lucide Icons</strong> & ShadCN UI for clean UI components</li>
            <li><strong>Google OAuth</strong> for secure and simple login</li>
            <li><strong>Role-based access</strong> for distinguishing doctors and regular users</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
