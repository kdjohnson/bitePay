<?php

require 'vendor/autoload.php';
/*
$app = new \Slim\App();

//Get contianer
$container = $app->getContainer();


//Register component on container 
$container['view'] = function($container) {
    $view = new \Slim\Views\Twig('./', [
	    'cache' => 'cache']);

    $view->addExtension(new \Slim\View\TwigExtension( 
		$container['router'],
		$container['request']->getUri()
		));

    return $view;
};

$app->get('/', function ($request, $response, $args) {
	return $this->view->render($response, 'index.html');
    });

$app->run();*/
// Create and configure Slim app
$app = new \Slim\App;

$container = $app->getContainer();


//Register component on container 
$container['view'] = function($container) {
    $view = new \Slim\Views\Twig('./templates', [
	    'cache' => 'cache']);

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

// Run app
$app->run();
