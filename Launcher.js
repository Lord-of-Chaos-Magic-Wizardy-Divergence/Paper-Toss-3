class Launcher{
    constructor(bodyA, pointB){
        var options = {
            bodyA: bodyA,
            pointB: pointB,
            stiffness: 0.01,
            length: 10
        }
        this.pointB = pointB
        this.sling = Constraint.create(options);
        World.add(world, this.sling);
    }

    attach(body){
      this.sling.bodyA = body;
    }
    
    fly(){
      this.sling.bodyA = null;
    }

    display(){
        if(this.sling.bodyA){
            var pointA = this.sling.bodyA.position;
            var pointB = this.pointB;
            strokeWeight(15);
            stroke(50,0,0);
            rect(pointA.x - 10,pointA.y,20,10);
            line(pointA.x, pointA.y, pointB.x-15, pointB.y);
            line(pointA.x, pointA.y, pointB.x+25, pointB.y);
        }
    }
    
}