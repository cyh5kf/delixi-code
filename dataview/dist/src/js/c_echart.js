function Circle(data){
  this.$el = data.$el;
  this.ctx = null;
  this.date = data.date;
  this.text = data.text;
  this.ranking = data.ranking;
  this.scale = data.scale;
  this.init();
}
Circle.prototype.init=function(){
  this.ctx=this.$el.getContext("2d");
  this.render()
}

Circle.prototype.render=function(){
  this.ctx.beginPath();
  this.ctx.arc(200*this.scale,200*this.scale,152*this.scale,0,this.ranking[0].proportion*2*Math.PI);
  this.ctx.lineWidth = 4*this.scale;
  // this.ctx.strokeStyle = "rgba(83,251,195,1)";
  this.ctx.strokeStyle = this.color(this.ranking[0].color,1);
  this.ctx.stroke();
  this.ctx.beginPath();
  this.ctx.arc(200*this.scale,200*this.scale,152*this.scale,this.ranking[0].proportion*2*Math.PI,(this.ranking[0].proportion+this.ranking[1].proportion)*2*Math.PI);
  this.ctx.lineWidth = 4*this.scale;
  this.ctx.strokeStyle = this.color(this.ranking[1].color,1);
  this.ctx.stroke();
  this.ctx.beginPath();
  this.ctx.arc(200*this.scale,200*this.scale,152*this.scale,(this.ranking[0].proportion+this.ranking[1].proportion)*2*Math.PI,2*Math.PI);
  this.ctx.lineWidth = 4*this.scale;
  this.ctx.strokeStyle = this.color(this.ranking[2].color,1);
  this.ctx.stroke();

  this.ctx.beginPath();
  this.ctx.arc(200*this.scale,200*this.scale,135*this.scale,0,this.ranking[0].proportion*2*Math.PI);
  this.ctx.lineWidth = 30*this.scale;
  this.ctx.strokeStyle = this.color(this.ranking[0].color,0.3);
  this.ctx.stroke();
  this.ctx.beginPath();
  this.ctx.arc(200*this.scale,200*this.scale,135*this.scale,this.ranking[0].proportion*2*Math.PI,(this.ranking[0].proportion+this.ranking[1].proportion)*2*Math.PI);
  this.ctx.lineWidth = 30*this.scale;
  this.ctx.strokeStyle = this.color(this.ranking[1].color,0.3);
  this.ctx.stroke();
  this.ctx.beginPath();
  this.ctx.arc(200*this.scale,200*this.scale,135*this.scale,(this.ranking[0].proportion+this.ranking[1].proportion)*2*Math.PI,2*Math.PI);
  this.ctx.lineWidth = 30*this.scale;
  this.ctx.strokeStyle = this.color(this.ranking[2].color,0.3);
  this.ctx.stroke();
  this.ctx.beginPath();
  this.ctx.arc(200*this.scale,200*this.scale,115*this.scale,0,this.ranking[0].proportion*2*Math.PI);
  this.ctx.lineWidth = 10;
  this.ctx.strokeStyle = this.color(this.ranking[0].color,1);
  this.ctx.stroke();
  this.ctx.beginPath();
  this.ctx.arc(200*this.scale,200*this.scale,115*this.scale,this.ranking[0].proportion*2*Math.PI,(this.ranking[0].proportion+this.ranking[1].proportion)*2*Math.PI);
  this.ctx.lineWidth = 10;
  this.ctx.strokeStyle =  this.color(this.ranking[1].color,1);
  this.ctx.stroke();
  this.ctx.beginPath();
  this.ctx.arc(200*this.scale,200*this.scale,115*this.scale,(this.ranking[0].proportion+this.ranking[1].proportion)*2*Math.PI,2*Math.PI);
  this.ctx.lineWidth = 10;
  this.ctx.strokeStyle = this.color(this.ranking[2].color,1);
  this.ctx.stroke();

  this.ctx.font = 30*this.scale+'px SimSun'
  this.ctx.fillStyle = '#808080'
  this.ctx.fillText(this.date,125*this.scale,190*this.scale)
  this.ctx.font = 26*this.scale+'px SimSun'
  this.ctx.fillStyle = '#808080'
  this.ctx.fillText(this.text,155*this.scale,240*this.scale)
}

Circle.prototype.color = function ([a,b,c],opacity) {
  return 'rgba('+a+','+b+','+c+','+opacity+')'
}


Circle.prototype.update = function (arg) {
  for (const key in arg) {
      if (arg.hasOwnProperty(key)) {
          this[key] = arg[key];
      }
  }
  this.ctx.clearRect(0,0,400*this.scale,400*this.scale);
  this.render()
}
