<template>

    <div>
      <div class="flex justify-between items-center w-full">
          <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">
            FREQUENTLY ASKED QUESTIONS
          </h2>
      </div>
      <div class="my-4">

        <ul class="">

          <li v-for="(q, i) of faq" :key="i">
            <div class="p-4">
              <p class="text-lg font-semibold pb-3">{{ q.question }}</p>
              <p class="">{{ q.answer }}</p>
            </div>
          </li>

        </ul>

      </div>
    </div>

</template>

<script>
export default {
    computed: {

    },

    data() {
        return {
            faq: [
              {
                question: 'What is Lowtide?',
                answer: `Lowtide started as a simple app to help distribute
                and deploy demos more efficiently. Over time and with input
                feedback we realized that in reality it was best as a suite of
                tools which solved common problems and acted as a org-agnostic
                toolkit that could be augmented over time.`
              },
              {
                question: 'Who made this?',
                answer: `Lowtide is owned by the TCRM Technical PMM team, led by
                Jayger McGough Tomasino. It is actively under development, led by
                Luc Iyer and Romario Sarmiento, and new templates are constantly
                being added by Rodrigo Mercader, Aditi Patel, and Juan Ferreira.`
              },
              {
                question: 'What can Lowtide do?',
                answer: `First and foremost, Lowtide is an extremely quick and
                easy way to get a demo up and running in Tableau CRM. Lowtide can
                deploy one or multiple templates into an org, after which time
                all you need to do is navigate to the analytics studio and
                use the newly created template to publish an app. Lowtide also
                allows you to "timeshift" datasets, ie. rolling dates forward on
                a regular cadence so that your demo looks and works the same
                every day, regardless of whether or not your dashboards use
                relative date ranges.`
              },
              {
                question: 'Does it work with any Salesforce org?',
                answer: `Yes, though you may not be able to deploy templates
                which were developed in a gs0 environment into a production
                environment, as the result of an API version mismatch.`
              },
              {
                question: 'You didn\'t answer my question!',
                answer: `Reach out to me at luciyer@salesforce.com and I will be
                happy to personally answer your question or hear you out if you have
                an idea for a future improvement to put on the roadmap.`
              }
            ]
        }
    },
    methods: {

    },
    created() {

    },
}
</script>

<style>

</style>
