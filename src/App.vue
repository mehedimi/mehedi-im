<script setup>
import Project from "./components/Project.vue";
</script>

<template>
  <header class="text-center py-5">
    <img
      src="../images/mehedi-hasan.png"
      class="inline-block w-20 rounded-full bg-gray-100"
      alt="Mehedi Hasan"
    />
    <h1 class="py-3 text-3xl tracking-wider text-gray-900 font-bold">
      Mehedi Hasan
    </h1>
  </header>
  <section class="mt-10">
    <div class="px-4 mx-auto prose prose-amber">
      <h2>Who am I?</h2>
      <p>As-salamualikum everyone!</p>
      <p>
        I'm
        <a target="_blank" href="https://github.com/mehedimi" title="@mehedimi"
          >Muhammad Mehedi Hasan</a
        >, a Full stack developer,
        <a href="https://en.wikipedia.org/wiki/Open_source" target="_blank"
          >Open source contributor</a
        >
        and
        <a href="https://en.wikipedia.org/wiki/Islam" target="_blank"
          >Islamic book reader</a
        >. I want to build something that solves some problems of others and me.
        Mainly I work on
        <em><a href="https://php.net" target="_blank">PHP</a></em>
        stack but work's on
        <em
          ><a href="https://en.wikipedia.org/wiki/JavaScript" target="_blank"
            >JavaScript</a
          ></em
        >
        too. Currently, I am working in a software company named
        <a href="https://wedevs.com" target="_blank">weDevs</a>
        as a Senior Software Engineer.
      </p>

      <h2>What I have made?</h2>

      <p>The following projects have been made by me:</p>

      <Project>
        <template #title>
          <a href="https://countdownbuilder.com">Countdown Builder</a>
        </template>
        <p>
          Supercharge your email campaigns with our dynamic countdowns. Our
          email countdown builder is the key to crafting visually stunning,
          time-sensitive emails that boost conversions. Perfect for product
          launches, sales promotions, or event invitations, our tool
          effortlessly captivates your audience.
        </p>
        <img
          src="https://countdownbuilder.com/wp-content/uploads/2023/11/countdown.gif"
          alt="Countdown Builder"
        />
        Let's create the own
        <a href="https://app.countdownbuilder.com/countdowns">
          email countdown timer</a
        >
      </Project>

      <Project>
        <template #title>
          <a href="https://github.com/mehedimi/wp-query-builder"
            >WP Query Builder</a
          >
        </template>
        It is a <code>composer</code> package, which can simplify your database
        query writing experience. For installation just run flowing
        <code>composer install</code> command.
        <pre>composer require mehedimi/wp-query-builder</pre>
        For more information, Here is the GitHub repo link:
        <a href="https://github.com/mehedimi/wp-query-builder" target="_blank"
          >mehedimi/wp-query-builder</a
        >
      </Project>

      <Project>
        <template #title>
          <a href="https://github.com/mehedimi/laravel-dynamodb"
            >Laravel DyanamoDB</a
          >
        </template>
        It is a package for
        <a target="_blank" href="https://laravel.com">Laravel</a>
        framework also you can use into general PHP projects too. By using this
        package, you can interact with
        <a href="https://aws.amazon.com/dynamodb/" target="_blank"
          >AWS DyanamoDB</a
        >
        with the fluent syntax, also it has
        <a href="https://laravel.com/docs/master/eloquent" target="_blank"
          >Eloquent</a
        >
        support too. You can perform <em>CRUD</em> operation very easily and
        also it supports batch operation, items pagination and lots more.
      </Project>

      <Project>
        <template #title>
          <a href="https://github.com/mehedimi/laravel-amp-mail"
            >Laravel AMP Mail</a
          >
        </template>
        This package lets you send an email with
        <a href="https://amp.dev/about/email/" target="_blank">AMP</a>
        support. So you can easily send AMP mail alongside HTML or Text email.
        So if the mail client of your user doesn't support AMP mail, then he or
        she can see the HTML or the Text-only version of your mail.
      </Project>

      <Project>
        <template #title>
          <a href="https://github.com/mehedimi/typing-v3"
            >Typing Master for Developer</a
          >
        </template>
        It is a typing app for developers. You can type expressions of a variety
        of programming languages rather than a random paragraph. You can try now
        by clicking
        <a href="https://typing-v3.netlify.app/" target="_blank">demo</a>
        here.
      </Project>

      <Project>
        <template #title>
          <a href="https://github.com/mehedimi/path-game"
            >Six men's morris (Game)</a
          >
        </template>
        This is a simple path matching game. You can try
        <a href="https://path-game.herokuapp.com/" target="_blank">demo</a>
        here.
      </Project>

      <Project>
        <template #title>
          <a href="https://wordpress.org/plugins/product-watcher"
            >Product Watcher</a
          >
        </template>
        <b>Product Watcher</b> is a WordPress plugin, that allows showing
        product viewer count in the WooCommerce store in real time.
      </Project>
    </div>
  </section>

  <footer class="my-12">
    <div class="px-4 mx-auto prose prose-amber">
      <h2>Where you can find me?</h2>
      <p>
        You can find me on the social media, like
        <a target="_blank" href="https://twitter.com/mehedimi">Twitter</a>,
        <a target="_blank" href="https://github.com/mehedimi">GitHub</a>
        or
        <a target="_blank" href="https://www.linkedin.com/in/mehedimi/"
          >LinkedIn</a
        >. Also you can contact with me via
        <a href="mailto:mehedihasansabbirmi@gmail.com">Email</a>.
      </p>
    </div>
  </footer>
</template>
