import { Post } from './post.model'; 
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class PostsService {

  private posts: Post[] = [];
  
  public getPosts() {
      return [...this.posts];
  }

  public addPost(title: string, content: string) {
      const post: Post = {
          title: title,
          content: content
      }

      this.posts.push(post);
  }
  
}