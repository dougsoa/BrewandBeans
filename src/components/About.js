import React from 'react';

function About() {
  return (
    <div className="about-container min-h-screen overflow-y-auto">
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div>
          <h1 className="text-2xl font-semibold mb-4">About Brew & Beans</h1>
          <p className="text-lg mb-4">
            Brew & Beans is your new best friend in the world of <strong className="font-semibold">coffee</strong>! Record your adventures with new brews or old favorites, and save those recipes you’ve just discovered.
          </p>
          <p className="text-lg mb-4">
            With us, every cup is a new surprise and each recipe is a chapter in your personal journey through the <strong className="font-semibold">coffee</strong> universe.
          </p>
        </div>

        {/* Right Column */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Why Use Brew & Beans?</h2>
          <p className="text-lg mb-4">
            With Brew & Beans, you can rate your <strong className="font-semibold">coffees</strong>, save recipes, and document your <strong className="font-semibold">coffee</strong> adventures. Keep a diary of your epic brews and discover new flavors, all with a super friendly interface.
          </p>
          <p className="text-lg mb-4">
            Turn each cup into a new journey and every recipe into a new story in the <strong className="font-semibold">coffee</strong> world. ☕✨
          </p>
        </div>

        {/* Second Left Column */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-lg mb-4">
            Brew & Beans was born from the passion of a <strong className="font-semibold">coffee</strong> lover. Determined to share this passion, they created a platform to help other enthusiasts and aficionados record their adventures in the <strong className="font-semibold">coffee</strong> world.
          </p>
          <p className="text-lg mb-4">
            We believe everyone has a unique relationship with <strong className="font-semibold">coffee</strong> and each brewed cup is an opportunity to create something special. The platform aims to inspire users to explore, experiment, and record their own creations.
          </p>
        </div>

        {/* Second Right Column */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg mb-4">
            Our mission is to make <strong className="font-semibold">coffee</strong> more accessible and fun, from the newbie who thinks "espresso" is a place to the expert who knows every bean. We offer tools to explore flavors, experiment with methods, and keep track of your adventures like they're precious secrets.
          </p>
          <p className="text-lg mb-4">
            At Brew & Beans, every sip is a new discovery. We’re here to make your <strong className="font-semibold">coffee</strong> journey as enjoyable as a steaming cup or a refreshing iced brew 👀!
          </p>
        </div>
      </section>
      <footer className="text-center mt-8">
  <p>We mentioned the word <strong className="font-semibold">coffee</strong> 13 times — maybe it's superstition or just the number of cups you drink in a day. ☕️😉</p>
</footer>

    </div>
  );
}

export default About;
