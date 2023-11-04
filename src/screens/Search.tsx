import { useEffect, useState } from "react";
import SearchBar from "../design/interface/Search/SearchBar";
import "../styles/Search.css";
import ListDivider from "../design/interface/ListDivider/ListDivider";
import SearchTrackItem from "../components/SearchTrackItem/SearchTrackItem";
import { supabase } from "../supabase/client";
import CircularProgressIndicator from "../design/interface/ProgressIndicator/CircularProgressIndicator/CircularProgressIndicator";
import LinearProgressIndicator from "../design/interface/LinearProgressIndicator/LinearProgressIndicator";
import FilterChip from "../design/interface/Chip/FilterChip";

const Search = () => {
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(false);

    const [results, setResults] = useState<SearchResult[]>([]);

    useEffect(() => {
        setLoading(true);
        const GetData = async () => {
            if (search == "") {
                setResults([]);
                return;
            }

            const response = await supabase.functions.invoke<{
                query_result: SearchResult[];
            }>("get-search-list", {
                body: {
                    query_text: search,
                },
            });

            if (response.data) {
                console.log(response.data);
                setResults(response.data.query_result);
            }
        };

        const delay = setTimeout(async () => {
            await GetData();
            setLoading(false);
        }, 1500);

        return () => clearTimeout(delay);
    }, [search]);

    return (
        <div id="search-screen">
            <header id="search-header">
                {/* <LinearProgressIndicator
                    progress={results.length > 0 ? 100 : 0}
                    indeterminate={loading}
                    config={{ duration: 1.5, delay: 0.5 }}
                /> */}
                <div id="search-header-content">
                    <SearchBar
                        id="search-bar"
                        hint="Type URL or title"
                        value={search}
                        onChangeText={setSearch}
                    />
                </div>
                {/* <div id="search-bar-wrapper">
                    <FilterChip label="Duration" />
                </div> */}
            </header>
            <div id="search-results">
                {loading ? (
                    <div id="search-loading">
                        <CircularProgressIndicator />

                        <span>Loading...</span>
                    </div>
                ) : (
                    <ListDivider
                        style={{
                            margin: "auto",
                            width: "90%",
                            maxWidth: "720px",
                            // transform: "translateX(6px)",
                        }}
                        empty="No results"
                        items={results.map((item, index) => (
                            <SearchTrackItem
                                id={item.id}
                                key={index}
                                title={item.title}
                                artists={item.channel.name}
                                thumbnail={item.thumbnail.url}
                                durationFormatted={item.duration_formatted}
                            />
                        ))}
                    />
                )}
            </div>
        </div>
    );
};

interface SearchResult {
    id: string;
    title: string;
    duration: number;
    duration_formatted: string;
    thumbnail: {
        url: string;
    };
    channel: {
        name: string;
    };
}

export default Search;
