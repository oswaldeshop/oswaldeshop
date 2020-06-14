var myCanvas = document.getElementById('blue');



var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create engine
var engine = Engine.create(),
    world = engine.world;

// create renderer
var render = Render.create({
  canvas: myCanvas,
  engine: engine,
  options: {
    width: 420,
    height: 600,
    background: '#eb5c34',
    showAngleIndicator: false,
    wireframes: false
  }
});


engine.world.gravity.y = 0;

  Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    var offset = 26,
        options = { 
            isStatic: true,
            render: {
              fillStyle: 'blue'
            }
        };

    world.bodies = [];
    
  World.add(world, [
        Bodies.rectangle(420, -offset, 800 + 2 * offset, 50.5, options),
        Bodies.rectangle(420, 600 + offset, 800.5 + 2 * offset, 50.5, options),
        Bodies.rectangle(420 + offset, 300, 50.5, 600.5 + 2 * offset, options),
        Bodies.rectangle(-offset, 300, 50.5, 600.5 + 2 * offset, options)
    ]);

    var miles = Bodies.rectangle(132, 45, 220, 35, {
      restitution: 0.5,
      render: {
        fillStyle: '#ff0000',
        sprite: {
          texture: 'fur.png'
        }
      }
    });

    var date = Bodies.rectangle(-20, -20, 2, 5, {
      restitution: 0.5,
      render: {
        fillStyle: '#ff0000',
        sprite: {
          texture: 'pro.png'
        }
      }
    });

    var blue = Bodies.rectangle(253, 95, 244, 35, {
      restitution: 0.5,
      render: {
        fillStyle: '#ff0000',
        sprite: {
          texture: 'pro.png'
        }
      }
    });

    var records = Bodies.rectangle(210, 153, 378, 35, {
      restitution: 0.5,
      render: {
        sprite: {
          texture: 'sour.png'
        }
      }
    });

    var trump = Bodies.rectangle(197, 500, 214, 35, {
      restitution: 0.5,
      render: {
        fillStyle: '#ff0000',
        sprite: {
          texture: 'logo.png'
        }
      }
    });

    var ball1 = Bodies.circle(320, 255, 45, {
      restitution: 0.5,
      render: {
        fillStyle: '#0000ff'
        // sprite: {
        //   texture: 'http://workbypost.com/mike/2trump.png'
        // }
      }
    });

    World.add(world, [miles, date, records, blue, trump, ball1]);

    // World.add(world, stack);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 420, y: 600 }
    });



var downloadBtn = document.getElementById('download');

downloadBtn.onclick = function(){
  download(myCanvas, 'myimage.png');
}


/* Canvas Donwload */
function download(canvas, filename) {
  /// create an "off-screen" anchor tag
  var lnk = document.createElement('a'), e;

  /// the key here is to set the download attribute of the a tag
  lnk.download = filename;
  console.log(lnk.download);

  /// convert canvas content to data-uri for link. When download
  /// attribute is set the content pointed to by link will be
  /// pushed as "download" in HTML5 capable browsers
  lnk.href = canvas.toDataURL("image/png;base64");

  /// create a "fake" click-event to trigger the download
  if (document.createEvent) {
    e = document.createEvent("MouseEvents");
    e.MouseEvent("click", true, true, window,
                     0, 0, 0, 0, 0, false, false, false,
                     false, 0, null);

    lnk.dispatchEvent(e);
  } else if (lnk.fireEvent) {
    lnk.fireEvent("onclick");
  }
}