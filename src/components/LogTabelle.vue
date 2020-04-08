<template>
  <div>
    <v-container class="grey lighten-5 mt-3">
      <v-card class="d-flex mb-6">
        <v-card class="pa-2 " flat>
          <div class="mt-4 ml-2">
            <span class="title">FMS:</span>
          </div>
        </v-card>
        <v-card class="pa-2 mr-auto" flat>
          <v-select
            v-model="serverSelected"
            :items="serverAdressen"
            label="Server"
            single-line
          ></v-select>
        </v-card>
        <v-card class="pa-2" flat>
          <v-row no-gutters>
            <v-select
              v-model="logSelected"
              :items="logDateien"
              label="Log File"
              single-line
              class="logSelectFeld"
            ></v-select>
            <v-btn
              color="primary"
              tile
              class="ml-2 mr-2 mt-3 ml-4"
              @click="Aktualisieren"
            >
              <v-icon left>mdi-update</v-icon>Update
            </v-btn>
          </v-row>
        </v-card>
      </v-card>
    </v-container>
    <v-container>
      <v-card>
        <v-card-title class="title">
          <span v-if="backend.url === '' || fileName === ''"></span>
          <span v-else>{{ fileName }}@{{ backend.url }}</span>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          dense
          :headers="headers"
          :items="daten"
          :search="search"
          :footer-props="{
            showFirstLastPage: true,
            showCurrentPage: true,
            'items-per-page-options': [50, 100, 500, 1000, -1]
          }"
          :items-per-page="50"
        ></v-data-table>
      </v-card>
    </v-container>
    <v-dialog v-model="dialogLoading" hide-overlay persistent width="400">
      <v-card color="primary" dark>
        <v-card-text>
          {{ dialogMeldung }}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbarLoading" color="error" :timeout="timeout" top>
      {{ snackbarMeldung }}
      <v-btn dark text @click="snackbarLoading = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
/* eslint-disable no-console */
const axios = require("axios");
const https = require("https");
const moment = require("moment");

// require("dotenv").config();

export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Timestamp",
          align: "left",
          sortable: false,
          value: "ts",
          width: "170"
        },
        {
          text: "Type",
          align: "left",
          sortable: false,
          value: "type",
          width: "90"
        },
        { text: "Num", align: "center", value: "num", width: "80" },
        { text: "Message", align: "left", value: "message" }
      ],
      headersDE: [
        {
          text: "Zeitstempel",
          align: "left",
          sortable: false,
          value: "ts",
          width: "170"
        },
        {
          text: "Typ",
          align: "left",
          sortable: false,
          value: "type",
          width: "90"
        },
        { text: "Num", align: "center", value: "num", width: "80" },
        { text: "Meldung", align: "left", value: "message" }
      ],
      daten: [],
      serverSelected: "",
      serverAdressen: ["<serverURL 1>", "<serverURL 2>", "<serverURL 3>"],
      logSelected: "",
      logDateien: ["Access.log", "Event.log", "fmdapi.log"],
      backend: {
        protocol: "https",
        url: "",
        port: "3050",
        accessRoute: "access",
        eventRoute: "event",
        dapiRoute: "dapi"
      },
      dialogLoading: false,
      dialogMeldung: "Loading data",
      snackbarLoading: false,
      snackbarMeldung: "",
      logRadio: null,
      fileName: "",
      timeout: 2000,
      ZeigeServeListe: false
    };
  },

  created() {},

  computed: {},

  methods: {
    readLogFile(fileName) {
      let URL = "";
      let domainSelected = this.serverSelected;

      if (fileName === "access") {
        URL = `${this.backend.protocol}://${domainSelected}:${this.backend.port}/${this.backend.accessRoute}`;
      } else if (fileName === "event") {
        URL = `${this.backend.protocol}://${domainSelected}:${this.backend.port}/${this.backend.eventRoute}`;
      } else if (fileName === "dapi") {
        URL = `${this.backend.protocol}://${domainSelected}:${this.backend.port}/${this.backend.dapiRoute}`;
      }

      // console.log(URL);
      this.dialogLoading = true;
      const agent = new https.Agent({
        rejectUnauthorized: true
      });

      axios
        .get(URL, { httpsAgent: agent })
        .then(response => {
          let datenTemp = [];
          datenTemp = response.data;

          // console.log(datenTemp);
          // for loop um das Datumsformat auf YYYY-MM-DD und die Uhrzeit auf hh-mm anzupassen
          for (let index = 0; index < datenTemp.length; index++) {
            const element = datenTemp[index];
            if (element.type) {
              element.type = element.type.slice(0, 3);
            }
            if (element.ts) {
              element.ts = moment(element.ts).format("YYYY-MM-DD HH:mm:ss");
            }
          }
          return (this.daten = datenTemp);

          // console.log(response);
        })
        .then(() => {
          this.dialogLoading = false;
          this.backend.url = this.serverSelected;
          let filePrefix = "";
          if (fileName === "dapi") {
            filePrefix = "fm";
          }
          this.fileName = `${filePrefix}${fileName}.log`;
        })
        .catch(err => {
          console.log(err);
          this.daten = [];
          this.dialogLoading = false;
          this.backend.url = "";
          this.fileName = "";
          (this.snackbarMeldung = "Data clould not be loaded"),
            (this.snackbarLoading = true);
        });
    },

    Aktualisieren() {
      if (
        this.logRadio === "accessRadio" ||
        this.logSelected === "Access.log"
      ) {
        // lese Access.log
        this.readLogFile("access");
      } else if (
        this.logRadio === "eventRadio" ||
        this.logSelected === "Event.log"
      ) {
        // lese Event.log
        this.readLogFile("event");
      } else if (
        this.logRadio === "dapiRadio" ||
        this.logSelected === "fmdapi.log"
      ) {
        // lese dapi.log
        this.readLogFile("dapi");
      } else {
        this.snackbarMeldung = "Please choose a log file";
        this.snackbarLoading = true;
        this.backend.url = "";
        this.daten = [];
      }
    }
  }
};
</script>

<style scoped>
.logSelectFeld {
  width: 160px;
}
</style>
