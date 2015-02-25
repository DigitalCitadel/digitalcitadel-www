var sticky = new Waypoint.Sticky({
    element: $('#sticky-nav'),
    handler: handleSticky
});

function handleSticky(direction)
{
    if(direction === 'down')
    {
        console.log('Scrolled down to waypoint!');
    }
    else if(direction === 'up')
    {
        //$('#sticky-nav .logo-container')
        console.log('Scrolled up to waypoint!');
    }
}

hljs.initHighlightingOnLoad();

