<template>
  <v-footer padless>
    <v-card style="background: #fafafa" class="flex" flat tile>
      <v-card-title class="justify-center font-weight-light caption">
        Made with&nbsp;<span style="color: #e25555;">&hearts;</span>&nbsp;by
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              color="#e25555"
              class="font-weight-bold caption px-0 custom-transform-class text-none"
              text
              href="https://www.agametis.de"
              target="_blank"
            >
              <span>agametis</span>
            </v-btn>
          </template>
          <span>gehe zu https://www.agametis.de</span>
        </v-tooltip>
      </v-card-title>
    </v-card>
  </v-footer>
</template>
