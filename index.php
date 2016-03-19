<?php

require 'vendor/autoload.php';

// Create and configure Slim app
$app = new \Slim\App;

$container = $app->getContainer();


//Register component on container 
$container['view'] = function($container) {
    $view = new \Slim\Views\Twig('./templates');

    $view->addExtension(new \Slim\Views\TwigExtension( 
		$container['router'],
		$container['request']->getUri()
		));

    return $view;
};

// Define app routes
$app->get('/', function ($request, $response) {
        return $this->view->render($response, 'index.html');
});

$app->get('/register', function ($request, $response) {
        return $this->view->render($response, 'signup.html');
});
// Run app
$app->run();
