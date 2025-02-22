import { ApiContext } from "@/api/ApiProvider"
import { GetActiveGameResponse } from "@/models/getActiveGameResponse";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react"
import { toasterError } from "./notification-service";

export interface GameService {
    activeGame?: GetActiveGameResponse;
    loading: boolean;
}

export function useGameService(): GameService {
    const { generalApi } = useContext(ApiContext);

    const result = useQuery({
        queryKey: ['activeGame'],
        queryFn: () => generalApi.getActiveGame(),
    });

    useEffect(() => {
        if (result.isError) {
            toasterError('Unable to load data');
        }
    }, [result.isError]);

    return {
        activeGame: result.data ? {
            id: result.data.id,
            asset: result.data.asset,
            createdAt: result.data.createdAt,
            name: result.data.name,
            prize: result.data.prize,
            status: result.data.status,
            ticketPrice: result.data.ticketPrice,
            endsAt: new Date(result.data.endsAt),
            playersTotal: result.data.playersTotal
        } : undefined,
        loading: result.isFetching,
    };
};

export interface GameDetailsService {
    playerNames: string[];
    loading: boolean;
}

export function useGameDetailsService(): GameDetailsService {
    const { generalApi } = useContext(ApiContext);

    const result = useQuery({
        queryKey: ['gameDetails'],
        queryFn: () => generalApi.getGameDetails(),
    });

    useEffect(() => {
        if (result.isError) {
            toasterError('Unable to load data');
        }
    }, [result.isError]);

    return {
        playerNames: result.data?.playerNames ?? [],
        loading: result.isLoading
    }
}