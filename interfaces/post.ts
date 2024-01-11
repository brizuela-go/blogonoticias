interface Post {
  sys: {
    id: string;
    createdAt: string;
  };
  fields: {
    title: string;
    slug: string;
    body: Object;
    description: string;
    tags: string[];
    image: {
      fields: {
        title: string;
        file: {
          url: string;
        };
      };
    };
  };
}

export default Post;
