export interface Post {
    node: {
        author: {
            name: string
            photo: {
                url: string
            }
        }
        createdAt: string
        slug: string
        title: string
        excerpt: string
        featuredImage: {
            url: string
        }
    }
}

export interface PostDetails {
    slug: string
    title: string
    excerpt: string
    createdAt: string
    featuredImage: {
        url: string
    }
    content: {
        json: {
            children: [{
                type: string,
                children: [{
                    text: string
                }]
            }]
        }
    }
    author: {
        name: string
        bio: string
        photo: {
            url: string
        }
    }
}

export interface Comments {
    id: string
    name: string
    email: string
    comment: string
    createdAt: string
}