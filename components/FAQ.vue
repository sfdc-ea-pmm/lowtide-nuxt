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
                question: 'Who maintains Lowtide?',
                answer: ``
              },
              {
                question: 'What can Lowtide do?',
                answer: ``
              },
              {
                question: 'Does it work with any Salesforce org?',
                answer: ``
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
