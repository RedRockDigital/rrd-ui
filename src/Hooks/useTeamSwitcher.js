import useRequest from "@/Hooks/useRequest";
import useUser from "@/Hooks/useUser";

const useTeamSwitcher = () => {
    const { patch } = useRequest();
    const { loadUser } = useUser();

    return async (teamId) => {
        const request = await patch("me/team", {
            team_id: teamId,
        });

        if (request.success) {
            await loadUser();
        }

        return request;
    };
};

export default useTeamSwitcher;
