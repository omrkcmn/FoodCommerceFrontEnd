import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/comment';
import { Restourant } from 'src/app/models/restourant';
import { CommentService } from 'src/app/services/comment.service';
import { RestourantService } from 'src/app/services/restourant.service';

@Component({
  selector: 'app-restourant-comment',
  templateUrl: './restourant-comment.component.html',
  styleUrls: ['./restourant-comment.component.css']
})
export class RestourantCommentComponent implements OnInit {

  comments:Comment[]=[]
  starCount:number
  restourant:Restourant[]=[]
  avarage:number=0
  totalComment:number
  
  constructor(private commentService:CommentService,
    private activatedRoute:ActivatedRoute,
    private restService:RestourantService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["restourantid"]){
        this.getCommentByRestId(params["restourantid"])
        this.getRestourantById(params["restourantid"])
      }else{
        
      }
    });
  }

  getAvarage(){
    var sum = 0;
        if(this.comments.length !==0){
          for( var i = 0; i < this.comments.length; i++ ){
             sum += Number( this.comments[i].puan ); //don't forget to add the base
          }
          this.starCount = Math.round(sum/this.comments.length)
          return (sum/this.comments.length).toFixed(2);
        }
      return false;
    
  }
  
  getRestourantById(id:number){
      this.restService.getRestsByRestId(id).subscribe(response=>{
        this.restourant = response.data
      })
  }
  getCommentByRestId(id:number){
    this.commentService.getCommentsByRestId(id).subscribe(response=>{
      this.comments = response.data
      this.totalComment = this.comments.length
    })
  }

}
