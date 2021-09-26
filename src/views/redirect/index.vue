<script lang="tsx">
import { defineComponent, h, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { NEmpty } from "naive-ui";

export default defineComponent({
  name: "Redirect",
  setup() {
    const route = useRoute();
    const router = useRouter();
    onBeforeMount(() => {
      const { params, query } = route;
      const { path } = params;
      console.log("/" + (Array.isArray(path) ? path.join("/") : path));
      router.replace({
        path: "/" + (Array.isArray(path) ? path.join("/") : path),
        query,
      });
    });
    return () => h(NEmpty);
  },
});
</script>
