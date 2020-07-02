<template>
  <div class="home">
    Power Bi Sample
    <div ref="reportContainer" class="reportContainer"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import * as pbi from "powerbi-client";

const accessToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IlNzWnNCTmhaY0YzUTlTNHRycFFCVEJ5TlJSSSIsImtpZCI6IlNzWnNCTmhaY0YzUTlTNHRycFFCVEJ5TlJSSSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMDRiYjYzZTktMjE0MS00M2MxLTk1YTctNTU5NWVmMDk3NjFhLyIsImlhdCI6MTU5MzU1MDEyMywibmJmIjoxNTkzNTUwMTIzLCJleHAiOjE1OTM1NTQwMjMsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJFMkJnWUxqR3FoeTJlZjd5QXVYTWppL3p3NXc2ZXA2ZTZXRGZwTnJVby8vSDlabG9YamdBIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6ImVhMDYxNmJhLTYzOGItNGRmNS05NWI5LTYzNjY1OWFlNTEyMSIsImFwcGlkYWNyIjoiMCIsImdpdmVuX25hbWUiOiJBYXJvbiIsImlwYWRkciI6IjcwLjM2LjQ4LjIxMyIsIm5hbWUiOiJBYXJvbiIsIm9pZCI6ImQyOTZjNTA2LTUzMjAtNGEwYS05OWU5LWRiMmJhMmMxMjRmMiIsInB1aWQiOiIxMDAzMjAwMEJGRjZFNDM3Iiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoiUnlrV1cydnpLSnRwNkpnY05Wdzc2UFJpQm1VMTAyamg5UTBvODVfYnhOZyIsInRpZCI6IjA0YmI2M2U5LTIxNDEtNDNjMS05NWE3LTU1OTVlZjA5NzYxYSIsInVuaXF1ZV9uYW1lIjoiYWFyb25AY291bnRhYmxlLmNhIiwidXBuIjoiYWFyb25AY291bnRhYmxlLmNhIiwidXRpIjoicmpLancxR1pjMDI3ZFdEVGZZc19BQSIsInZlciI6IjEuMCJ9.mUt4225cvxndqvne7XciVvKsb9ka9RWnjS5ccBTGBypgRN1iaTTzJBphKfMK7rXn-0PpCiwBsCzJrNq3I-SCK4A8YdEPcrGbl7RUOgaM1r48KtJFPprCYRzwjlj8itrFBKri_raJEaDGdO6e4u0a11t3Ap4A58HORExkqpZ5P1d1exE6cz3alM74msyvRZ3cbKjaU0EEJXHNfNqjEMRZqW7L7nDCDZX7Tl3ESJ_Ivn2cvqdF4HjfG4YXGkWwww5o-xT6kN-Zgoytfvp6qbX4aitNvsIJb-YWcQKkROWOj9ALBdcrXA6mVz-CFX2k3lh_VH-Y-UsWFsHIer9po07y7Q";
export default {
  name: "Home",
  mounted() {
    const models = pbi.models;
    const embedConfiguration = {
      type: "report",
      id: "fcd6a2ea-375c-4c3e-95cc-45f7b50ac1c1",
      embedUrl:
        "https://app.powerbi.com/reportEmbed?reportId=ffd96ae6-d380-4b0a-b892-9b10c1ccb332&groupId=c01c3203-966c-4a73-a8a9-50b6f9cc8bc8&w",
      tokenType: models.TokenType.Aad,
      accessToken: accessToken
    };
    window.powerbi.embed(this.$refs.reportContainer, embedConfiguration);
  }
};
</script>
