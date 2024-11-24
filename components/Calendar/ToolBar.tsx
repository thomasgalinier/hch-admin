import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {modelSchema, ViewType} from "@/components/Calendar/shema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {useMutation, useQuery} from "@tanstack/react-query";
import { getTechnicien } from "@/service/auth";
import { UserType } from "@/schema";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useCookies } from "react-cookie";
import {useState} from "react";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {createModel} from "@/components/Calendar/service";
import * as z from "zod";

interface ToolBarProps {
  setView: (view: ViewType) => void;
  view: "day" | "week" | "month";
  toolbarInfo: (view: ViewType) => string;
  goNext: () => void;
  goBack: () => void;
  goToday: () => void;
}

const ToolBar = (props: ToolBarProps) => {
  const [cookies] = useCookies(["token"]);
  const [technicien, setTechnicien] = useState<UserType | null>(null);
  const { setView, view, toolbarInfo, goNext, goBack, goToday } = props;
  const handleViewChange = (view: ViewType) => {
    setView(view);
  };
  const { data: technicienData = [] } = useQuery({
    queryFn: () => getTechnicien(cookies.token),
    queryKey: ["technicien"],
  });
  const mutationModel = useMutation({
    mutationFn: createModel,
    mutationKey: ['model']
  })
  const formModel = useForm({
    resolver: zodResolver(modelSchema),
    defaultValues:{
      nom: "",
      duree: 15,
    }
  })
  const onSubmitModel = (data: z.infer<typeof modelSchema>) => {
    console.log(data)
    mutationModel.mutate(data)
  }
  return (
    <div className="flex justify-between mb-2">
      <div className="flex items-center gap-2">
        <div className="flex gap-2">
          <Button variant="ghost" onClick={goBack}>
            <ChevronLeft />
          </Button>
          <Button variant="secondary" onClick={goToday}>
            Aujourd&apos;hui
          </Button>
          <Button variant="ghost" onClick={goNext}>
            <ChevronRight />
          </Button>
        </div>
        <div className="text-xl">{toolbarInfo(view)}</div>
      </div>
      <div className="flex gap-2  items-center w-3/5">
        <Select onValueChange={(value) => setTechnicien(value)}>
          <SelectTrigger>
            <SelectValue>
              <div className="flex items-center gap-2">
                <Avatar className="size-7">
                  <AvatarImage
                    src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${technicien?.nom}${technicien?.prenom}`}
                  />
                </Avatar>
                {technicien?.nom}.{technicien?.prenom}
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {technicienData.map((technicien: UserType) => (
                  //@ts-ignore
                <SelectItem key={technicien.id} value={technicien}>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-7">
                      <AvatarImage
                        src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${technicien?.nom}${technicien?.prenom}`}
                      />
                    </Avatar>
                    {technicien.nom}.{technicien.prenom}
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger>
              <Button variant="secondary">Créer un modéle</Button>
            </PopoverTrigger>
            <PopoverContent>
              <Form {...formModel}>
                <form onSubmit={formModel.handleSubmit(onSubmitModel)}>
                  <div>
                    <FormField control={formModel.control} name="nom" render={({field}) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" placeholder="Nom" />
                          </FormControl>
                        </FormItem>
                    )} />
                    <FormField control={formModel.control} name="duree" render={({field}) => (
                        <FormItem>
                          <FormLabel>Durée</FormLabel>
                          <FormControl>
                            <Input {...field} type="time" placeholder="Durée" />
                          </FormControl>
                        </FormItem>
                    )} />
                    <Button type="submit" className='mt-2'>Créer</Button>
                  </div>
                </form>
              </Form>
            </PopoverContent>
          </Popover>
          <Button>Créer un evénement</Button>
        </div>
        <div className="flex">
          <Button
            variant={view === "day" ? "secondary" : "ghost"}
            onClick={() => handleViewChange("day")}
          >
            Jour
          </Button>
          <Button
            variant={view === "week" ? "secondary" : "ghost"}
            onClick={() => handleViewChange("week")}
          >
            Semaine
          </Button>
          <Button
            variant={view === "month" ? "secondary" : "ghost"}
            onClick={() => handleViewChange("month")}
          >
            Mois
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
