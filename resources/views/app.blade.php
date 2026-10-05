<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-theme="black">

<head>
    <script>
        (function() {
            try {
                var theme = localStorage.getItem('fubball-theme') || 'black';
                document.documentElement.setAttribute('data-theme', theme);
            } catch (e) {}
        })();
    </script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#000000">
    <meta name="application-name" content="Fubball">
    <meta name="apple-mobile-web-app-title" content="Fubball">
    <meta name="author" content="Fubball">
    <meta name="format-detection" content="telephone=no">

    <x-inertia::head>
        <title>Fubball</title>
        <meta name="description" content="Fubball is a continuous online football simulation where every match, vote, and strange turn of events shapes the league.">
    </x-inertia::head>

    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5237792343647777" crossorigin="anonymous"></script>
    <meta name="google-adsense-account" content="ca-pub-5237792343647777">

    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

    <link rel="manifest" href="/site.webmanifest">

    @routes
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    @inertiaHead

</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
