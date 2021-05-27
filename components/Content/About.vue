<template>
  <div>
    <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide mb-3">
      About
    </h2>
    <div class="text-sm text-gray-900 space-y-3 text-justify">
      <p>
        Hello! Welcome to <strong>Lowtide</strong>, a suite of tools designed to make it easier to demo our analytics products.
      </p>
      <p>
        These tools are currently in <strong>alpha testing</strong> stage, so expect that occasionally bugs or oddities may appear. Please bear with us as we improve them and continuously add new functionality and net new tools.
      </p>
      <p>
        We hope that this application is relatively self-explanatory, but in the interest of being as user-friendly as possible, please
        <a class="font-bold text-blue-600 cursor-pointer hover:text-blue-500" target="_blank" href="https://www.loom.com/share/299e1a7a27aa4b1b872ab8cdf9c44946">
          start by watching this video tutorial
        </a>, and
        <ContentFAQLink />
      </p>
      <p>
        For developers or those with enough knowledge of javascript to be dangerous, we've made available <a class="font-bold text-blue-600 cursor-pointer hover:text-blue-500" target="_blank" href="https://github.com/romariosc97/lowtide-boilerplate">lowtide-boilerplate</a>, an application shell designed to allow you to develop your own tools by providing a simple API layer with authentication into Salesforce and the basic frontend skeleton that you see in this very app.
      </p>
      <p>
        Please direct any questions or issues to <strong>Luc Iyer</strong> by clicking "Email" below.
      </p>
    </div>
  </div>
</template>

<script>
export default {}
</script>
