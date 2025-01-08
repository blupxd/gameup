import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="p-4 py-20 md:px-20 text-sm">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4"><strong>Last updated:</strong> January 8, 2025</p>
      <p className="mb-4">
        FoundDuo ("us", "we", or "our") operates nowebsiteyet.com (the "Site"). This page informs you of our policies regarding the collection, use, and disclosure of Personal Information we receive from users of the Site. We use your Personal Information only for providing and improving the Site and services. By using the Site, you agree to the collection and use of information in accordance with this policy.
      </p>
      <hr className="my-4" />
      <h2 className="text-xl font-bold mb-2">Information Collection and Use</h2>
      <p className="mb-4">
        While using our Site, we may ask you to provide certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Riot Account Information (e.g., Summoner Name, Rank, etc.)</li>
        <li>Steam ID and associated data</li>
        <li>Epic Games ID and account validation information</li>
      </ul>
      <p className="mb-4">
        This information will be stored securely in our database and used to provide and enhance our services.
      </p>
      <hr className="my-4" />
      <h2 className="text-xl font-bold mb-2">Log Data</h2>
      <p className="mb-4">
        Like many site operators, we collect information that your browser sends whenever you visit our Site ("Log Data"). This Log Data may include:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Your computer's Internet Protocol ("IP") address</li>
        <li>Browser type and version</li>
        <li>Pages visited, time spent on those pages, and the date/time of access</li>
        <li>Other diagnostic data</li>
      </ul>
      <hr className="my-4" />
      <h2 className="text-xl font-bold mb-2">Cookies</h2>
      <p className="mb-4">
        Cookies are small files placed on your device to collect information. We use cookies to:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Maintain session management</li>
        <li>Improve user experience</li>
        <li>Identify logged-in users</li>
      </ul>
      <h3 className="text-lg font-bold mb-2">Cookies We Use</h3>
      <ol className="list-decimal list-inside mb-4">
        <li><strong>Session Cookie:</strong> Maintains user sessions during a visit.</li>
        <li><strong>Authentication Cookie:</strong> Verifies user authentication (e.g., Steam, Riot, or Epic Games OAuth).</li>
        <li><strong>Preferences Cookie:</strong> Stores user settings or preferences for the Site.</li>
      </ol>
      <p className="mb-4">
        You can instruct your browser to refuse all cookies or indicate when a cookie is being sent. Note that some portions of the Site may not function correctly without cookies.
      </p>
      <hr className="my-4" />
      <h2 className="text-xl font-bold mb-2">Stored Data</h2>
      <p className="mb-4">We store the following user-related information:</p>
      <h3 className="text-lg font-bold mb-2">Riot Games Integration:</h3>
      <ul className="list-disc list-inside mb-4">
        <li>Summoner Name and ID</li>
        <li>Summoner Icon</li>
        <li>Solo Queue and Flex Queue ranks, tiers, wins, and losses</li>
        <li>Summoner Level</li>
        <li>Riot API data update timestamps</li>
      </ul>
      <h3 className="text-lg font-bold mb-2">Steam Integration:</h3>
      <ul className="list-disc list-inside mb-4">
        <li>Steam ID</li>
        <li>Public Steam profile details required for CS2-related features</li>
      </ul>
      <h3 className="text-lg font-bold mb-2">Epic Games Integration:</h3>
      <ul className="list-disc list-inside mb-4">
        <li>Epic Games ID</li>
        <li>Account validation details for Fortnite-related features</li>
      </ul>
      <hr className="my-4" />
      <h2 className="text-xl font-bold mb-2">Security</h2>
      <p className="mb-4">
        We prioritize securing your personal data. All user information is stored securely and is accessible only to authorized personnel. However, no transmission or storage method is completely secure, and we cannot guarantee absolute data security.
      </p>
      <hr className="my-4" />
      <h2 className="text-xl font-bold mb-2">Matomo Analytics</h2>
      <p className="mb-4">
        We use Matomo for local data analytics to:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Identify and debug errors</li>
        <li>Understand usage patterns</li>
        <li>Improve user experience</li>
      </ul>
      <p className="mb-4">
        All Matomo-collected data is anonymized immediately and is not shared with third parties.
      </p>
      <hr className="my-4" />
      <h2 className="text-xl font-bold mb-2">Changes To This Privacy Policy</h2>
      <p className="mb-4">
        This Privacy Policy is effective as of January 8, 2025. We may update or change this policy periodically, and such updates will be posted on this page. Your continued use of the Site after any modifications to the Privacy Policy constitutes your acknowledgment and acceptance of these modifications.
      </p>
      <hr className="my-4" />
      <h2 className="text-xl font-bold mb-2">Contact Us</h2>
      <p className="mb-4">
        If you have any questions about this Privacy Policy, please contact us at:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Email:</strong> matija.stefanovic050@gmail.com</li>
        <li><strong>Discord:</strong> matijaxd005</li>
      </ul>
      <p className="mb-4">
        We value your privacy and strive to maintain transparency in all our practices.
      </p>
    </div>
  );
};

export default PrivacyPage;