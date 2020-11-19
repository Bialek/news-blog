/**
 * NEWS API
 * @author Szymon Białas
 */

function NewsApiService() {
  let lastId = 0;
  let lastCId = 0;

  const newsList = [
    {
      id: 0,
      title: "The first news",
      header: "This is header!",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam.",
      img: "https://via.placeholder.com/380x200",
      author: "Jan Kowalski",
      miniatureContent: "",
      miniatureColor: "is-success",
      miniatureIsVertical: false,
      miniatureSize: null,
    },
    {
      id: 1,
      title: "Hello World",
      header: "What is up?",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam.",
      img: null,
      author: "Jan Kowalski",
      miniatureContent: "",
      miniatureColor: null,
      miniatureIsVertical: false,
      miniatureSize: null,
    },
    {
      id: 2,
      title: "Third column",
      header: "With some content",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam.",
      img: null,
      author: "Jan Kowalski",
      miniatureContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam.",
      miniatureColor: "is-primary",
      miniatureIsVertical: false,
      miniatureSize: null,
    },
    {
      id: 3,
      title: "Vertical tiles",
      header: "Top box",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam.",
      img: null,
      author: "Jan Kowalski",
      miniatureContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam.",
      miniatureColor: "is-warning",
      miniatureIsVertical: true,
      miniatureSize: null,
    },
    {
      id: 4,
      title: "Middle box",
      header: "With an image",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam.",
      img: "https://via.placeholder.com/640x480",
      author: "Jan Kowalski",
      miniatureContent: null,
      miniatureColor: "is-danger",
      miniatureIsVertical: false,
      miniatureSize: null,
    },
    {
      id: 5,
      title: "Wide column",
      header: "Aligned with the right column",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam.",
      img: null,
      author: "Jan Kowalski",
      miniatureContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam.",
      miniatureColor: "is-info",
      miniatureIsVertical: false,
      miniatureSize: null,
    },
    {
      id: 6,
      title: "Tall column",
      header: "With even more content",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam.  Suspendisse varius ligula in molestie lacinia. Maecenas varius eget ligula a sagittis. Pellentesque interdum, nisl nec interdum maximus, augue diam porttitor lorem, et sollicitudin felis neque sit amet erat. Maecenas imperdiet felis nisi, fringilla luctus felis hendrerit sit amet. Aenean vitae gravida diam, finibus dignissim turpis. Sed eget variusligula, at volutpat tortor. Integer sollicitudin, tortor a mattis commodo, velit urna rhoncus erat, vitae congue lectus dolor consequat libero.Donec leo ligula, maximus et pellentesque sed, gravida a metus. Cras ullamcorper a nunc ac porta. Aliquam ut aliquet lacus, quis faucibus libero. Quisque non semper leo.",
      img: null,
      author: "Jan Kowalski",
      miniatureContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam.  Suspendisse varius ligula in molestie lacinia. Maecenas varius eget ligula a sagittis. Pellentesque interdum, nisl nec interdum maximus, augue diam porttitor lorem, et sollicitudin felis neque sit amet erat. Maecenas imperdiet felis nisi, fringilla luctus felis hendrerit sit amet. Aenean vitae gravida diam, finibus dignissim turpis. Sed eget variusligula, at volutpat tortor. Integer sollicitudin, tortor a mattis commodo, velit urna rhoncus erat, vitae congue lectus dolor consequat libero.Donec leo ligula, maximus et pellentesque sed, gravida a metus. Cras ullamcorper a nunc ac porta. Aliquam ut aliquet lacus, quis faucibus libero. Quisque non semper leo.",
      miniatureColor: null,
      miniatureIsVertical: true,
      miniatureSize: 6,
    },
    {
      id: 7,
      title: "Side column",
      header: "With some content",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam.",
      img: null,
      author: "Jan Kowalski",
      miniatureContent: null,
      miniatureColor: "is-link",
      miniatureIsVertical: true,
      miniatureSize: null,
    },
    {
      id: 7,
      title: "Main column",
      header: "With some content",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam.",
      img: "/200x200",
      author: "Jan Kowalski",
      miniatureContent: null,
      miniatureColor: null,
      miniatureIsVertical: true,
      miniatureSize: null,
    },
  ];

  let commentsList = [
    {
      id: 1,
      content: "This is comment example 1",
      author: "John Brix",
      newsId: 1,
    },
    {
      id: 2,
      content: "This is comment example 2",
      author: "John Brix",
      newsId: 1,
    },
    {
      id: 3,
      content: "This is comment example 3",
      author: "John Brix",
      newsId: 1,
    },
    {
      id: 4,
      content: "This is comment example 4",
      author: "John Brix",
      newsId: 1,
    },
  ];

  this.getNewsList = function () {
    return newsList;
  };

  this.validateNews = function (news) {
    if (typeof news.title !== "string") {
      throw new Error("No news title.");
    }
    if (typeof news.header !== "string") {
      throw new Error("No news header.");
    }
    if (typeof news.content !== "string") {
      throw new Error("No news content.");
    }
    if (typeof news.author !== "string") {
      throw new Error("No news author.");
    }
  };

  this.validateComment = function (comment) {
    console.log(comment);
    if (typeof comment.content !== "string") {
      throw new Error("No comment content.");
    }
    if (typeof comment.author !== "string") {
      throw new Error("No comment author.");
    }
    if (typeof comment.newsId !== "number") {
      throw new Error("No comment news id.");
    }
  };

  this.getNewsById = function (id) {
    return newsList.find((news) => news.id === parseInt(id));
  };

  this.getCommentById = function (id) {
    let result = null;
    commentsList.forEach(function (o) {
      if (o.id == id) {
        result = o;
      }
    });
    if (!result) {
      throw new Error("Comment not found.");
    }
    return result;
  };

  this.addNews = function (news) {
    console.log(news);
    this.validateNews(news);
    let nextId = lastId + 1;
    newsList.push(news);
    news.id = nextId;
    lastId = nextId;
    return { id: nextId, message: "News created." };
  };

  this.modifyNews = function (news) {
    news.id = parseInt(news.id, 10);
    let data = this.getNewsById(news.id);
    data.title = news.title;
    data.header = news.header;
    data.content = news.content;
    data.img = news.img;
    return { id: news.id, message: "News updated." };
  };

  this.removeNews = function (id) {
    id = parseInt(id, 10);
    let data = this.getNewsById(id);
    newsList = newsList.filter(function (news) {
      return news.id != id;
    });
    return { id: data.id, message: "News removed." };
  };

  this.getNewsComments = function (id) {
    id = parseInt(id, 10);

    return commentsList.filter((comment) => comment.newsId === id);
  };

  this.addComment = function (comment) {
    this.validateComment(comment);

    let newsId = parseInt(comment.newsId, 10);
    let data = this.getNewsById(newsId);

    let nextId = lastCId + 1;
    commentsList.push(comment);
    comment.id = nextId;
    comment.newsId = data.id;
    lastCId = nextId;
    return { id: nextId, message: "Comment created." };
  };

  this.removeComment = function (id) {
    id = parseInt(id, 10);
    let data = this.getCommentById(id);
    commentsList = commentsList.filter(function (comment) {
      return comment.id != id;
    });
    return { id: data.id, message: "Comment removed." };
  };
}

module.exports.NewsApiService = NewsApiService;
