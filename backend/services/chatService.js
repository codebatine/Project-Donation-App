const askChatbot = async (message) => {
  message = message.toLowerCase();

  if (message.includes('donate')) {
    return "You can donate by browsing our projects and clicking on 'Donate Now' on any project page. We make sure your contributions go directly to the cause!";
  } else if (
    message.includes('trending projects') ||
    message.includes('popular')
  ) {
    return "The trending projects right now are Clean Water for All and Education for Every Child. Visit the 'Projects' section to learn more!";
  } else if (message.includes('get started')) {
    return "To get started, you can sign up, browse our projects, and find a cause that resonates with you. We're here to make giving easy and impactful!";
  } else if (message.includes('help')) {
    return "I'm here to help! You can ask me about donation steps, trending projects, or how to get started.";
  } else {
    return `You asked: "${message}". Currently, I can assist with information about our donation platform, projects, and getting started!`;
  }
};

module.exports = { askChatbot };
