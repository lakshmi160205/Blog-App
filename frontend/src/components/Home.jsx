import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../store/authStore";
import {
  pageBackground,
  pageWrapper,
  section,
  cardClass,
  pageTitleClass,
  headingClass,
  bodyText,
  primaryBtn,
  secondaryBtn,
  linkClass,
  articleGrid,
  articleCardClass,
  articleTitle,
  articleExcerpt,
  articleMeta,
} from "../styles/common";

function Home() {
  const navigate = useNavigate();
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate(user?.role === "AUTHOR" ? "/author-profile" : "/user-profile");
    } else {
      navigate("/register");
    }
  };

  const handleExploreArticles = () => {
  if (isAuthenticated) {
    navigate(user?.role === "AUTHOR" ? "/author-profile" : "/user-profile");
  } else {
    navigate("/login");
  }
};

  const features = [
    {
      title: "Write & Share",
      description: "Create engaging articles and share your knowledge with the community.",
      icon: "✍️",
    },
    {
      title: "Discover Content",
      description: "Explore diverse topics from technology to lifestyle and beyond.",
      icon: "🔍",
    },
    {
      title: "Connect & Learn",
      description: "Engage with authors, leave comments, and grow together.",
      icon: "🤝",
    },
  ];

  const categories = [
    { name: "Technology", count: "25+ articles", color: "bg-blue-100 text-blue-800" },
    { name: "Programming", count: "18+ articles", color: "bg-green-100 text-green-800" },
    { name: "AI & ML", count: "12+ articles", color: "bg-purple-100 text-purple-800" },
    { name: "Web Development", count: "20+ articles", color: "bg-orange-100 text-orange-800" },
  ];

  return (
    <div className={pageBackground}>
      {/* Hero Section */}
      <div className={`${pageWrapper} text-center`}>
        <div className="mb-16">
          <h1 className={`${pageTitleClass} mb-6`}>
            Welcome to <span className="text-[#0066cc]">MyBlog</span>
          </h1>
          <p className={`${bodyText} text-xl max-w-2xl mx-auto mb-8`}>
            A platform where ideas come to life. Share your knowledge, discover new perspectives,
            and connect with a community of passionate writers and readers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={handleGetStarted} className={primaryBtn}>
              {isAuthenticated ? "Go to Profile" : "Get Started"}
            </button>
            <button onClick={handleExploreArticles} className={secondaryBtn}>
              Explore Articles
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className={section}>
          <h2 className={`${headingClass} text-center mb-12`}>Why Choose MyBlog?</h2>
          <div className={articleGrid}>
            {features.map((feature, index) => (
              <div key={index} className={`${cardClass} text-center`}>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className={`${articleTitle} mb-3`}>{feature.title}</h3>
                <p className={articleExcerpt}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className={section}>
          <h2 className={`${headingClass} text-center mb-8`}>Popular Categories</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`${category.color} px-6 py-3 rounded-full text-sm font-medium cursor-pointer hover:opacity-80 transition-opacity`}
              >
                {category.name} • {category.count}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className={`${section} bg-[#f5f5f7] rounded-3xl p-12 text-center`}>
          <h2 className={`${headingClass} mb-4`}>Ready to Start Writing?</h2>
          <p className={`${bodyText} mb-6 max-w-xl mx-auto`}>
            Join our community of writers and share your unique perspective with the world.
          </p>
          <button
            onClick={() => navigate("/register")}
            className={primaryBtn}
          >
            Join as Author
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;